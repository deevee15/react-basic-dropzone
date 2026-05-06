# React Basic Dropzone

<!-- [![npm version](https://img.shields.io/npm/v/react-basic-dropzone.svg)](https://www.npmjs.com/package/react-basic-dropzone)
[![npm downloads](https://img.shields.io/npm/dm/react-basic-dropzone.svg)](https://www.npmjs.com/package/react-basic-dropzone)
[![CI](https://github.com/deevee15/react-basic-dropzone/actions/workflows/ci.yml/badge.svg)](https://github.com/deevee15/react-basic-dropzone/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->

React Basic Dropzone is React library for files uploading via drag&drop or by click in a dropzone area.

Read more about React Basic Dropzone:
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Compatibility](#compatibility)
- [Licence](#license)

## Features
- Drag & drop + click to select
- MIME type validation (`accept` prop)  
- File size & count limits
- Upload progress tracking
- Upload cancellation (AbortController)
- Keyboard accessible (ARIA)
- Tree-shakeable (ES + CJS)
- Full TypeScript support

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

Run the following to use the latest stable version
```
npm install --save react-basic-dropzone
```

> **Peer dependencies:** `react` >= 18.0.0 and `react-dom` >= 18.0.0
### Tailwind CSS Requirement
This component uses Tailwind CSS utility classes. Make sure your Tailwind config scans the library:
```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-basic-dropzone/dist/**/*.js', // ← add this
  ],
}
```

## Usage
```tsx
import { Dropzone, DropzoneProps, UploadCbProps } from 'react-basic-dropzone'
import axios from 'axios'
import { AxiosError, AxiosProgressEvent } from 'axios'

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

function App(){
    return (
        <div className="w-lg mx-auto">
            <Dropzone 
                upload={upload} 
                maxFiles={5} 
                maxFileSize={5 * 1024 * 1024 * 1024} 
                accept={'image/*'}
                disabled={false}
            />
        </div>
    )
}

```

## API Reference
### `<Dropzone />` Props
| Prop | Type | Required | Default | Description |
|------|------|:--------:|:-------:|-------------|
| `upload` | `UploadCbProps` | ✅ | — | Upload callback function (see below) |
| `maxFiles` | `number` | ✅ | — | Maximum number of files allowed |
| `maxFileSize` | `number` | ✅ | — | Maximum file size in bytes |
| `disabled` | `boolean` | ✅ | — | Disables the dropzone |
| `accept` | `string` | — | `'*/*'` | Accepted MIME types. Supports wildcards: `'image/*'`, comma-separated: `'image/png, application/pdf'` |
| `textContent` | `TextContent` | — | see below | Customize UI text |
#### `textContent`
```typescript
{
  title?: string       // Default: "Drag and drop files here or click to select"
  description?: string // Default: "Max file size: {formatted}"
}
```
### `UploadCbProps`
The upload callback receives the following parameters:
```typescript
type UploadCbProps = (
  file: File,
  setUploadResult: (value: 'idle' | 'uploading' | 'success' | 'error' | 'canceled') => void,
  setProgressValue?: (value: number) => void,
  controllerRef?: RefObject<AbortController | null>
) => Promise<void> | void
```
| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | `File` | The file to upload |
| `setUploadResult` | `function` | Set upload status: `'idle'`, `'uploading'`, `'success'`, `'error'`, `'canceled'` |
| `setProgressValue` | `function` | Set progress percentage (0–100) |
| `controllerRef` | `RefObject` | AbortController ref for cancellation |
### `useDropzone(options)` Hook
For custom UI implementations, use the hook directly:
```typescript
import { useDropzone } from 'react-basic-dropzone'
const {
  processedFiles,   // FileWithId[] — accepted files
  processFiles,     // (files: File[], accept?: string) => void
  setProcessedFiles,// (files: FileWithId[]) => void
  removeFile,       // (id: string) => void
  clearFiles,       // () => void
  errors,           // string[] — error codes
  rejectedFiles,    // string[] — rejected file names
} = useDropzone({
  maxFiles: 10,
  maxFileSize: 5 * 1024 * 1024,
})
```
#### Options
| Option | Type | Required | Description |
|--------|------|:--------:|-------------|
| `maxFiles` | `number` | ✅ | Maximum files allowed |
| `maxFileSize` | `number` | ✅ | Maximum file size in bytes |
#### Error Codes
| Code | Description |
|------|-------------|
| `'invalid_file_type'` | File MIME type doesn't match `accept` |
| `'max_files_count'` | Maximum file count exceeded |
| `'big_file_size'` | File exceeds `maxFileSize` |
### `FileWithId` Type
```typescript
type FileWithId = {
  id: string       // Unique identifier (crypto.randomUUID)
  uploaded: boolean // true after successful upload
  file: File       // Native File object
}
```
### `formatSize(bytes: number): string`
Utility to format bytes into human-readable string:
```typescript
import { formatSize } from 'react-basic-dropzone'
formatSize(1536)      // "1.5 KB"
formatSize(5242880)   // "5 MB"
formatSize(0)         // "0 B"
```

## Compatibility
The library is compatible with the Chrome 92+, Firefox 95+, Safari 15.4+, Edge 92+. IE is not supported.

Unfortunately, it is difficult to support legacy browsers while maintaining our ability to develop new features in the future. For IE9 support, it is known that the classlist polyfill is needed, but this may change or break at any point in the future.

## Demo
Here is the link to the [demo website](https://dropzone.deevee.ru)

## License
MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org