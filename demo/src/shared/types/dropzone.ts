import { ChangeEvent, RefObject, DragEvent } from "react"

export interface DropzoneProps {
    upload: (
        file: File, 
        setUploadResult: (value: 0 | 1 | 2) => void, 
        setProgressValue?: (value: number) => void, 
        controllerRef?: RefObject<AbortController | null>
    ) => (Promise<void> | void)
    minFiles: number
    maxFiles: number
    maxFileSize: number
    accept: string
    textContent?: {
        title?: string
        loading?: string
        cancelButton?: string
        uploadButton?: string
    }
    customization?: {

    }
    darkModeBool?: boolean
    // uploadedFiles: File[]
    // setUploadedFiles: (files: File[]) => void
    // handleFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    // handleDrop: (e: DragEvent<HTMLDivElement>) => void
    // upload: () => Promise<void>
    // controllerRef: RefObject<AbortController | null>
    // errorText: string
    // setErrorText: (value: string) => void
    // uploadStatus: number
    // setUploadStatus: (value: number) => void
    // refresh: () => void
    // clear: () => void
    // progressValue: number
    // filesCount: number
    // setFilesCount: (value: number) => void
}