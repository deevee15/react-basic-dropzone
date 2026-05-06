import { RefObject } from "react"

export type UploadCbProps = (
    file: File, 
    setUploadResult: (value: 'idle' | 'uploading' | 'success' | 'error' | 'canceled') => void, 
    setProgressValue?: (value: number) => void, 
    controllerRef?: RefObject<AbortController | null>
) => (Promise<void> | void)


export interface DropzoneHookOptionsProps {
    disabled?: boolean
    maxFiles: number
    maxFileSize: number
}

export interface DropzoneHookProps {
    processedFiles: File[]
    errors: string[]
    processFiles: (files: File[], accept?: string) => void
    removeFile: (index: number) => void
    clearFiles: () => void
    rejectedFiles: string[]
}

export interface DropzoneProps {
    accept?: string
    maxFiles: number
    disabled: boolean
    maxFileSize: number
    textContent?: {
        title?: string
        description?: string
        loading?: string
        cancelButton?: string
        uploadButton?: string
    }
    upload: UploadCbProps
}

export interface FileElementProps {
    file: File
    uploadFunc: UploadCbProps
    deleteFunc: () => void
}