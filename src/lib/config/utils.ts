export const toBoolean = <T>(value?: T) => {
    if (typeof value === 'boolean') {
        return value
    }

    if (value === 'true' || value === '1') {
        return true
    }

    return false
}

export const splitCorsOrigin = (origin: string) => {
    const splittedOrigin = origin.split(',').map(result => {
        const value = result.trim()

        if (value === '*') {
            return result
        }

        return new RegExp(value)
    })

    return splittedOrigin.length === 1 ? splittedOrigin.at(0) : splittedOrigin
}
