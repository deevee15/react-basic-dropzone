import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './app'

//types
import { UserInitialState } from '@/shared/types/user/initial-state'

export async function render(url: string) {
  const html: string = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
  return { html }
}
