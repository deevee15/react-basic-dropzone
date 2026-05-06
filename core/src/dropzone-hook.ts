import { useCallback, useState } from 'react'
//types
import { DropzoneHookOptionsProps, DropzoneHookProps, FileWithId } from './types'
//utils
import { validateFile } from './utils'

export function useDropzone (options: DropzoneHookOptionsProps): DropzoneHookProps {
    const [processedFiles, setProcessedFiles] = useState<FileWithId[]>([])
    const [rejectedFiles, setRejectedFiles] = useState<string[]>([])

    const [errors, setErrors] = useState<string[]>([])

    const processFiles = (files: File[], accept?: string): void => {
        setProcessedFiles(prev => {
            const currentCount = prev.length
            const newFiles: FileWithId[] = []
            
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

                newFiles.push({
                    id: crypto.randomUUID(),
                    uploaded: false,
                    file: file,
                })
            }
            
            return [...prev, ...newFiles]
        })
    }
 
    const removeFile = useCallback((id: string) => {
        setProcessedFiles(prevFiles => prevFiles.filter((file) => file.id !== id))
    }, [])
    
    const clearFiles = (): void => setProcessedFiles([])

    return {
        processFiles, processedFiles, setProcessedFiles,rejectedFiles,
        errors,
        removeFile, clearFiles,
    }
}