export const localStorageGetItem = (key: string) =>
    window.localStorage.getItem(key)
export const localStorageSetItem = (key: string, value: any) =>
    window.localStorage.setItem(key, value)
export const localStorageRemoveItem = (key: string) =>
    window.localStorage.removeItem(key)
