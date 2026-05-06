import { useEffect, useRef, useState, MouseEvent } from 'react'
//func
import { formatSize } from './utils'
//types
import { FileElementProps } from './types'
//icons
const FileIcon = () => {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9167 1.83325H5.50008C5.01385 1.83325 4.54754 2.02641 4.20372 2.37022C3.8599 2.71404 3.66675 3.18036 3.66675 3.66659V18.3333C3.66675 18.8195 3.8599 19.2858 4.20372 19.6296C4.54754 19.9734 5.01385 20.1666 5.50008 20.1666H16.5001C16.9863 20.1666 17.4526 19.9734 17.7964 19.6296C18.1403 19.2858 18.3334 18.8195 18.3334 18.3333V8.24992L11.9167 1.83325Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M11.9167 1.83325V8.24992H18.3334" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    )
}
const DeleteIcon = ({ onClick }: { onClick: (e: MouseEvent) => void }) => {
    return (
        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
            <path d="M3.25 5.5H5.08333H19.75" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M7.8335 5.50001V3.66668C7.8335 3.18045 8.02665 2.71413 8.37047 2.37031C8.71428 2.0265 9.1806 1.83334 9.66683 1.83334H13.3335C13.8197 1.83334 14.286 2.0265 14.6299 2.37031C14.9737 2.71413 15.1668 3.18045 15.1668 3.66668V5.50001M17.9168 5.50001V18.3333C17.9168 18.8196 17.7237 19.2859 17.3799 19.6297C17.036 19.9735 16.5697 20.1667 16.0835 20.1667H6.91683C6.4306 20.1667 5.96428 19.9735 5.62047 19.6297C5.27665 19.2859 5.0835 18.8196 5.0835 18.3333V5.50001H17.9168Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M9.6665 10.0833V15.5833" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M13.3335 10.0833V15.5833" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    )
}

const FileElement = ({ file, uploadFunc, deleteFunc }: FileElementProps) => {
    const controllerRef = useRef<AbortController | null>(null)

    const [progressValue, setProgressValue] = useState<number>(0)

    const cancelUploading = (): void => {
        if(controllerRef.current) {
            controllerRef.current.abort()
            setProgressValue(0)
            setUploadResult('canceled')
        }
    }

    const [uploadResult, setUploadResult] = useState<'idle' | 'uploading' | 'success' | 'error' | 'canceled'>('idle')

    useEffect(() => {
        uploadFunc(file, setUploadResult, setProgressValue, controllerRef)
    }, [])

    return (
        <div className='relative w-full p-2 border border-grey-200 rounded-md mb-1'>
            <div className='flex items-center relative'>
                <FileIcon />
                <div className='ml-4'>
                    <p className='font-bold text-lg'>{file.name}</p>
                    <div className='text-md flex items-center'>
                        <p className='text-grey-200'>{formatSize(file.size)}</p>
                        {
                            uploadResult !== 'idle' && uploadResult !== 'uploading' && (
                                <p className='ml-1 text-grey-200 text-transform-capitalize'>{uploadResult}</p>
                            )
                        }
                        {
                            progressValue > 0 && progressValue < 100 && (
                                <p className='absolute right-2 text-grey-200'>{progressValue}%</p>
                            )
                        }
                    </div>
                </div>
                {
                    uploadResult === 'uploading' && (
                        <div className='flex items-center absolute right-2 top-0 h-full cursor-pointer' onClick={cancelUploading}>
                            <span className='w-0.5 h-4 block rotate-45 bg-green-800'></span>
                            <span className='w-0.5 -ml-0.5 h-4 block -rotate-45 bg-green-800'></span>
                        </div>
                    )
                }
                {
                    uploadResult !== 'idle' && uploadResult !== 'uploading' && (
                        <div className='absolute right-2 top-0 flex items-center h-full cursor-pointer'>
                            <DeleteIcon onClick={deleteFunc}/>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    progressValue > 0 && progressValue < 100 && (
                        <div className="w-full bg-gray-300 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progressValue}%` }}></div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default FileElement