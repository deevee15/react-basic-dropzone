import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDropzone } from '../src/dropzone-hook'

const createMockFile = (name: string, size: number, type: string): File => {
    const file = new File(['x'.repeat(size)], name, { type })
    Object.defineProperty(file, 'size', { value: size })
    return file
}

describe('useDropzone', () => {
    const defaultOptions = { maxFiles: 5, maxFileSize: 10_000_000 }

    it('starts with empty processedFiles', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))
        expect(result.current.processedFiles).toEqual([])
    })

    it('adds files via processFiles', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))
        const file = createMockFile('test.png', 1000, 'image/png')

        act(() => { result.current.processFiles([file]) })

        expect(result.current.processedFiles).toHaveLength(1)
        expect(result.current.processedFiles[0].file.name).toBe('test.png')
        expect(result.current.processedFiles[0].id).toBeDefined()
    })

    it('respects maxFiles limit', () => {
        const { result } = renderHook(() => useDropzone({ maxFiles: 2, maxFileSize: 10_000_000 }))

        act(() => {
            result.current.processFiles([
                createMockFile('a.png', 100, 'image/png'),
                createMockFile('b.png', 100, 'image/png'),
                createMockFile('c.png', 100, 'image/png'),
            ])
        })

        expect(result.current.processedFiles).toHaveLength(2)
        expect(result.current.errors).toContain('max_files_count')
    })

    it('rejects files exceeding maxFileSize', () => {
        const { result } = renderHook(() => useDropzone({ maxFiles: 5, maxFileSize: 500 }))
        const bigFile = createMockFile('huge.zip', 1000, 'application/zip')

        act(() => { result.current.processFiles([bigFile]) })

        expect(result.current.processedFiles).toHaveLength(0)
        expect(result.current.errors).toContain('big_file_size')
        expect(result.current.rejectedFiles).toContain('huge.zip')
    })

    it('validates accept MIME types', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))
        const pdfFile = createMockFile('doc.pdf', 100, 'application/pdf')

        act(() => { result.current.processFiles([pdfFile], 'image/*') })

        expect(result.current.processedFiles).toHaveLength(0)
        expect(result.current.errors).toContain('invalid_file_type')
    })

    it('accepts files matching accept wildcard', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))
        const imgFile = createMockFile('photo.jpg', 100, 'image/jpeg')

        act(() => { result.current.processFiles([imgFile], 'image/*') })

        expect(result.current.processedFiles).toHaveLength(1)
    })

    it('removes file by id', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))

        act(() => {
            result.current.processFiles([
                createMockFile('a.png', 100, 'image/png'),
                createMockFile('b.png', 100, 'image/png'),
            ])
        })

        const idToRemove = result.current.processedFiles[0].id

        act(() => { result.current.removeFile(idToRemove) })

        expect(result.current.processedFiles).toHaveLength(1)
        expect(result.current.processedFiles[0].file.name).toBe('b.png')
    })

    it('clears all files', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))

        act(() => {
            result.current.processFiles([createMockFile('a.png', 100, 'image/png')])
        })
        expect(result.current.processedFiles).toHaveLength(1)

        act(() => { result.current.clearFiles() })
        expect(result.current.processedFiles).toHaveLength(0)
    })

    it('assigns unique ids to files', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))

        act(() => {
            result.current.processFiles([
                createMockFile('a.png', 100, 'image/png'),
                createMockFile('b.png', 100, 'image/png'),
            ])
        })

        const ids = result.current.processedFiles.map(f => f.id)
        expect(new Set(ids).size).toBe(2)
    })

    it('accepts files when no accept is provided', () => {
        const { result } = renderHook(() => useDropzone(defaultOptions))

        act(() => { result.current.processFiles([createMockFile('any.xyz', 100, 'application/octet-stream')]) })

        expect(result.current.processedFiles).toHaveLength(1)
    })
})
