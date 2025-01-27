export const localStorageGetItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key)
    }
    return null
}

export const localStorageSetItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value)
    }
}

export const localStorageRemoveItem = (key: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
    }
}
