import { Dispatch } from 'react';
import { JSX } from 'react/jsx-runtime';
import { RefObject } from 'react';
import { SetStateAction } from 'react';

export declare const Dropzone: ({ accept, maxFiles, disabled, maxFileSize, textContent, upload }: DropzoneProps) => JSX.Element;

export declare interface DropzoneHookOptionsProps {
    disabled?: boolean;
    maxFiles: number;
    maxFileSize: number;
}

export declare interface DropzoneHookProps {
    errors: string[];
    processedFiles: FileWithId[];
    processFiles: (files: File[], accept?: string) => void;
    setProcessedFiles: (files: FileWithId[]) => void;
    removeFile: (id: string) => void;
    clearFiles: () => void;
    rejectedFiles: string[];
}

export declare interface DropzoneProps {
    accept?: string;
    maxFiles: number;
    disabled: boolean;
    maxFileSize: number;
    textContent?: {
        title?: string;
        description?: string;
    };
    upload: UploadCbProps;
}

export declare interface FileElementProps {
    file: File;
    uploadFunc: UploadCbProps;
    uploadingAllowed: boolean;
    setProcessedFiles: Dispatch<SetStateAction<FileWithId[]>>;
    deleteFunc: () => void;
}

export declare type FileWithId = {
    id: string;
    uploaded: boolean;
    file: File;
};

export declare const formatSize: (size: number) => string;

export declare type UploadCbProps = (file: File, setUploadResult: (value: 'idle' | 'uploading' | 'success' | 'error' | 'canceled') => void, setProgressValue?: (value: number) => void, controllerRef?: RefObject<AbortController | null>) => (Promise<void> | void);

export declare function useDropzone(options: DropzoneHookOptionsProps): DropzoneHookProps;

export { }
