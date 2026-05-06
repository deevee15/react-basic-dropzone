import { RefObject } from "react"

export interface FileProps {
    file: File
    uploadFunc: (
        file: File, 
        setUploadResult: (value: 0 | 1 | 2) => void, 
        setProgressValue?: (value: number) => void, 
        controllerRef?: RefObject<AbortController | null>
    ) => (Promise<void> | void)
    deleteFunc: () => void
}