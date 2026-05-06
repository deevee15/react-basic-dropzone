const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const

export const formatSize = (size: number): string => {
    if (size <= 0 || !Number.isFinite(size)) return '0 B'

    const kilo = 1024

    const index = Math.floor(Math.log(size) / Math.log(kilo))
    const calculatedSize = parseFloat((size / Math.pow(kilo, index)).toFixed(2))
    
    return `${calculatedSize} ${UNITS[index]}`
}

export const validateFile = (fileType: string, accept: string): boolean => {
    if (!accept) return true

    const typesList = accept.split(',')
    
    for (const type of typesList) {
        const trimmedType = type.trim()
        if (trimmedType === fileType) return true

        if (trimmedType.endsWith('/*')) {
            const baseType = trimmedType.slice(0, -2)
            if (fileType.startsWith(baseType + '/')) return true
        }
    }

    return false
}