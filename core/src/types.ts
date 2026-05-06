import { Dispatch, RefObject, SetStateAction } from "react"

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

export type FileWithId = {
    id: string
    uploaded: boolean
    file: File
}

export interface DropzoneHookProps {
    errors: string[]
    processedFiles: FileWithId[]
    processFiles: (files: File[], accept?: string) => void
    setProcessedFiles: (files: FileWithId[]) => void
    removeFile: (id: string) => void
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
    }
    upload: UploadCbProps
}

export interface FileElementProps {
    file: File
    uploadFunc: UploadCbProps
    uploadingAllowed: boolean
    setProcessedFiles: Dispatch<SetStateAction<FileWithId[]>>
    deleteFunc: () => void
}