import { useState } from 'react'
//types
import { DropzoneHookOptionsProps, DropzoneHookProps } from './types'
//utils
import { validateFile } from './utils'

export function useDropzone (options: DropzoneHookOptionsProps): DropzoneHookProps {
    const [processedFiles, setProcessedFiles] = useState<File[]>([])
    const [rejectedFiles, setRejectedFiles] = useState<string[]>([])

    const [errors, setErrors] = useState<string[]>([])

    const processFiles = (files: File[], accept?: string): void => {
        setProcessedFiles(prev => {
            const currentCount = prev.length
            const newFiles: File[] = []
            
            for (const file of files) {
                const fileIsValid: boolean = accept ? validateFile(file.type, accept) : true
                
                if(!fileIsValid){
                    setErrors(prevErrors => [...prevErrors, 'invalid_file_type'])
                    setRejectedFiles(prevRejected => [...prevRejected, file.name])
                    continue
                }

                if (currentCount + newFiles.length >= options.maxFiles) {
                    setErrors(prevErrors => [...prevErrors, 'max_files_count'])
                    break
                }

                if (file.size > options.maxFileSize) {
                    setErrors(prevErrors => [...prevErrors, 'big_file_size'])
                    setRejectedFiles(prevRejected => [...prevRejected, file.name])
                    continue
                }

                newFiles.push(file)
            }
            
            return [...prev, ...newFiles]
        })
    }
 
    const removeFile = (needleIndex: number): void => {
        setProcessedFiles(prevFiles => {
            const filteredFiles = prevFiles.filter((_, index) => index !== needleIndex)

            return filteredFiles
        })
    }
    
    const clearFiles = (): void => setProcessedFiles([])

    return {
        processFiles, processedFiles, rejectedFiles,
        errors,
        removeFile, clearFiles,
    }
}