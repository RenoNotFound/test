import { EncryptStorage } from 'encrypt-storage';

export const encryptedStorage = new EncryptStorage(import.meta.env.VITE_ENCRYPTED_STORAGE_KEY, {
    prefix: '@persist',
    storageType: 'sessionStorage',
    // stateManagementUse: true,
});

export const checkIfPersistedKeyExists = (key, pattern = '', storage = encryptedStorage) => {
    if (!!pattern.length) {
        return storage.getItem(`${pattern}:${key}`)?.length
    } else {
        return storage.getItem(`${key}`)?.length
    }
}

export const getPersistedKeyValue = (key, pattern = '', storage = encryptedStorage) => {
    if (!!pattern.length) {
        return storage.getItem(`${pattern}:${key}`)
    } else {
        return storage.getItem(`${key}`)
    }
}

export const setPersistedKeyValue = (key, value, pattern = '', storage = encryptedStorage) => {
    if (!!pattern.length) {
        return storage.setItem(`${pattern}:${key}`, value)
    } else {
        return storage.setItem(`${key}`, value)
    }
}
