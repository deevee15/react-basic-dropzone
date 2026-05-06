import { describe, it, expect } from 'vitest'
import { formatSize, validateFile } from '../src/utils'

describe('formatSize', () => {
    it('returns "0 B" for zero', () => {
        expect(formatSize(0)).toBe('0 B')
    })

    it('returns "0 B" for negative values', () => {
        expect(formatSize(-100)).toBe('0 B')
    })

    it('returns "0 B" for Infinity', () => {
        expect(formatSize(Infinity)).toBe('0 B')
    })

    it('formats bytes correctly', () => {
        expect(formatSize(500)).toBe('500 B')
    })

    it('formats kilobytes correctly', () => {
        expect(formatSize(1024)).toBe('1 KB')
        expect(formatSize(1536)).toBe('1.5 KB')
    })

    it('formats megabytes correctly', () => {
        expect(formatSize(1048576)).toBe('1 MB')
        expect(formatSize(5242880)).toBe('5 MB')
    })

    it('formats gigabytes correctly', () => {
        expect(formatSize(1073741824)).toBe('1 GB')
    })
})

describe('validateFile', () => {
    it('returns true for empty accept', () => {
        expect(validateFile('image/png', '')).toBe(true)
    })

    it('validates exact MIME type', () => {
        expect(validateFile('image/png', 'image/png')).toBe(true)
        expect(validateFile('image/jpeg', 'image/png')).toBe(false)
    })

    it('validates wildcard MIME type', () => {
        expect(validateFile('image/png', 'image/*')).toBe(true)
        expect(validateFile('image/jpeg', 'image/*')).toBe(true)
        expect(validateFile('application/pdf', 'image/*')).toBe(false)
    })

    it('validates comma-separated list', () => {
        expect(validateFile('image/png', 'image/png, application/pdf')).toBe(true)
        expect(validateFile('application/pdf', 'image/png, application/pdf')).toBe(true)
        expect(validateFile('text/plain', 'image/png, application/pdf')).toBe(false)
    })

    it('handles whitespace in accept string', () => {
        expect(validateFile('image/png', ' image/png , image/jpeg ')).toBe(true)
    })
})
