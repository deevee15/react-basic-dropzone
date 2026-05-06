import { stat, readFile } from 'node:fs/promises'
import express from "express";
import type { Request, Response } from "express";
import type { Express } from "express";
import { rateLimit, ipKeyGenerator } from 'express-rate-limit'
import 'dotenv/config'

type RenderFunction = (url: string) => Promise<{ html: string; head?: string }>

const isProduction = process.env.NODE_ENV === 'production'
const port = 2220
const base = process.env.BASE || '/'


let cachedTemplate: any | null = null
let cachedMtime: number | null = null
let lastChecked: number = 0

async function getTemplate() {
  const now = Date.now()
  if (now - lastChecked < 1000 && cachedTemplate) return cachedTemplate

  const { mtimeMs } = await stat('./dist/client/index.html')
  if (!cachedTemplate || mtimeMs !== cachedMtime) {
    cachedTemplate = await readFile('./dist/client/index.html', 'utf-8')
    cachedMtime = mtimeMs
  }
  lastChecked = now
  return cachedTemplate
}

const app: Express = express()

app.disable('x-powered-by');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  keyGenerator: (req: Request, res: Response) => {
 		const apiKey = req.query.apiKey;

    if (typeof apiKey === "string") {
      return apiKey;
    }

		return ipKeyGenerator(req.ip || '')
	}
})

app.use(limiter)


let vite: any
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { 
      middlewareMode: true,
    },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} 
else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', {
    extensions: [],
    setHeaders(res, path) {
      if (path.endsWith('.map')) {
        res.statusCode = 404
      }
    }
  }))
}



app.use(async (req: Request, res: Response) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).send('Method Not Allowed')
    const url: string = req.originalUrl.replace(process.env.BASE_PATH, '/'); 
    if (url.length > 2048) return res.status(414).send('URI Too Long')

    let template: string
    let render: RenderFunction
    if (!isProduction) {
      template = await readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/app/entry-server.tsx')).render
    } 
    else {
      template = await getTemplate()

      const pathToMod = new URL('./dist/server/entry-server.js', import.meta.url).href
      const mod = await import(pathToMod + `?t=${cachedMtime}`)
      render = mod.render
    }


    const rendered: any = await render(url)
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-Content-Type-Options', 'nosniff')

    const html = template
      .replace(`<!--app-name-->`, process.env.SITE_TITLE ?? '')
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } 
  catch (e) {
    vite?.ssrFixStacktrace(e)
    console.error(e)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`Server started`)
})