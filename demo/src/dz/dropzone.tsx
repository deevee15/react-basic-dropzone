import { useRef, useState, DragEvent, ChangeEvent } from 'react'

//elements
import FileElement from './file-element'
//hooks
import { useDropzone } from "./dropzone-hook"
//types
import { DropzoneProps } from './types'
//utils
import { formatSize } from './utils'

const DropzoneIcon = () => {
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.9995 40L29.9995 30L19.9995 40" stroke="#006a4d" stroke-width="3.26672" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M30 30V52.5" stroke="#006a4d" stroke-width="3.26672" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M50.9756 45.9747C53.414 44.6454 55.3402 42.5419 56.4503 39.9963C57.5604 37.4506 57.7912 34.6078 57.1061 31.9164C56.4211 29.2251 54.8594 26.8385 52.6673 25.1333C50.4753 23.4282 47.7778 22.5015 45.0006 22.4997H41.8506C41.0939 19.5728 39.6835 16.8556 37.7255 14.5522C35.7675 12.2488 33.3127 10.4193 30.5459 9.20123C27.779 7.98313 24.772 7.40811 21.7509 7.51942C18.7298 7.63073 15.7733 8.42547 13.1036 9.84388C10.4338 11.2623 8.12041 13.2675 6.33719 15.7087C4.55396 18.1499 3.34736 20.9636 2.80808 23.9382C2.26881 26.9128 2.4109 29.971 3.22367 32.8829C4.03644 35.7947 5.49874 38.4844 7.50063 40.7497" stroke="#006a4d" stroke-width="3.26672" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M39.9995 40L29.9995 30L19.9995 40" stroke="#006a4d" stroke-width="3.26672" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    )
}

const Dropzone = ({ accept, maxFiles, disabled, maxFileSize, textContent, upload }: DropzoneProps) => {
    const {
        processFiles, processedFiles, rejectedFiles,
        errors,
        removeFile, clearFiles,
    } = useDropzone({
        maxFiles: maxFiles,
        disabled: disabled,
        maxFileSize: maxFileSize,
    })

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDropzoneClick = (): void => fileInputRef.current?.click()

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()

        const target = e.target as HTMLInputElement

        if(target){
            const needleFiles: File[] = Array.from(target.files || [])

            if(needleFiles.length > 0){ 
                processFiles(needleFiles, accept)
            }
        }
    }
    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault()

        const dataTransfer = e.dataTransfer
        if(dataTransfer){
            const needleFiles: File[] = Array.from(dataTransfer.files || [])

            if(needleFiles.length > 0){ 
                processFiles(needleFiles, accept)
            }
        }
    }

    const [dragOver, setDragOver] = useState<boolean>(false)
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(true)
    }


    const clearInputRef = (): void => {
        if(fileInputRef.current){
            fileInputRef.current.value = ''
        }
    }

    return (
        <>
            <div className="mt-6" aria-label="Dropzone element" aria-describedby="dropzone-title">
                <div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        name="file-select[]" 
                        id="file-select" 
                        multiple={maxFiles > 1}
                        accept={accept || '*/*'} 
                        className="hidden" 
                        onChange={(e) => { handleFileInputChange(e); clearInputRef(); }} />
                    <div 
                        role="button"
                        tabIndex={0}
                        aria-label="File upload dropzone. Drag and drop files here or press Enter to select."
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDropzoneClick() }}
                        onClick={handleDropzoneClick}
                        onDragOver={handleDragOver}
                        onDragLeave={() => setDragOver(false)}
                        onDragEnter={(e) => e.preventDefault()}
                        onDrop={(e: DragEvent<HTMLDivElement>) => {setDragOver(false); handleDrop(e)}}
                        className={`
                            select-none 
                            rounded-xl 
                            flex 
                            flex-col 
                            justify-center 
                            items-center 
                            bg-fruitgreen-100 
                            cursor-pointer
                            h-64 
                            relative 
                            w-full
                            border-2 
                            border-dashed 
                            border-gray-300
                            hover:bg-fruitgreen-100
                            ${dragOver ? 'bg-fruitgreen-100' : ''}
                            active:bg-fruitgreen-200
                        `}
                    >
                        <DropzoneIcon />
                        <p className="text-xl text-center font-medium text-fruitgreen-800" id='dropzone-title'>
                            {textContent?.title || `Drag and drop files here or click to select`}
                        </p>
                        <p className='text-xs text-green-200'>{textContent?.description || `Max file size: ${formatSize(maxFileSize)}`}</p>
                    </div>
                </div>
                <div className="mt-4 relative w-full">
                    <div className="mt-2 px-1.5 py-2 box-border relative">
                        {
                            processedFiles.length > 0 ?
                                processedFiles.map((oneFile, index) => {
                                    return (
                                        <FileElement 
                                            file={oneFile}
                                            uploadFunc={upload}
                                            deleteFunc={() => removeFile(index)} 
                                            key={`file-${oneFile.name}-${index}`}
                                        />
                                    )
                                })
                            : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dropzone