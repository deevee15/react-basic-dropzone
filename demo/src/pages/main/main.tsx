import { RefObject } from 'react'
//ui
import { Dropzone, DropzoneProps } from 'react-basic-dropzone'
//
import axios from 'axios'
import { AxiosError, AxiosProgressEvent } from 'axios'

const Main = () => {
    const upload: UploadCbProps = async (file, setUploadResult, setProgressValue, controllerRef) => {

        if(controllerRef && controllerRef.current){
            controllerRef.current.abort();
        }
        
        if(controllerRef){
            controllerRef.current = new AbortController();
        }

        try{
            setUploadResult("uploading")

            const api = axios.create({
                baseURL: `/api`,
                timeout: 35000,
            })

            const endpoint = 'files/upload'

            const body: FormData = new FormData()
            body.append('files', file)

            const apiReq = await api.post(endpoint, body, {
                signal: controllerRef?.current?.signal,
                onUploadProgress: (event: AxiosProgressEvent) => {
                    if(event.total && setProgressValue) {
                        const current: number = Math.round((event.loaded / event.total) * 100) || 0
                        setProgressValue(current)
                    }
                }
            })


            if(controllerRef) controllerRef.current = null;

            if(apiReq){
                setProgressValue && setProgressValue(100)
                setUploadResult("success")
            }
            else {
                setUploadResult("error")
            }
        }
        catch(err: unknown){
            if(controllerRef) controllerRef.current = null;
            if((err instanceof DOMException && err.name === 'AbortError') || (err instanceof Error && err.message === 'canceled')) {
                setUploadResult("canceled")
            }
            else setUploadResult("error")
        }
    }

    return (
        <div className="content">
          <div className="w-full">
            <h1 className="text-4xl font-bold text-fruitgreen-800 text-center">React Dropzone Library</h1>
            <div className="w-lg mx-auto">
                <Dropzone 
                    upload={upload} 
                    maxFiles={5} 
                    maxFileSize={5 * 1024 * 1024 * 1024} 
                    // accept={'image/*'}
                    disabled={false}
                />
            </div>
          </div>
        </div>
    )
}

export default Main