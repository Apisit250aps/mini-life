import CryptoJS from 'crypto-js'
import { createJSONStorage } from 'zustand/middleware'

export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_STORE_ENCRYPTION_KEY
export const ENCRYPTION_ENABLED =
  process.env.NEXT_PUBLIC_STORE_ENCRYPTION_ENABLED == 'true'

const encryptedStorage = {
  getItem: (name: string): string | null => {
    const encryptedValue = localStorage.getItem(name)
    if (!encryptedValue) return null

    try {
      const bytes = CryptoJS.AES.decrypt(
        encryptedValue,
        ENCRYPTION_KEY as string,
      )
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch (e) {
      console.error('Decryption failed', e)
      return null
    }
  },
  setItem: (name: string, value: string): void => {
    const encryptedValue = CryptoJS.AES.encrypt(
      value,
      ENCRYPTION_KEY as string,
    ).toString()
    localStorage.setItem(name, encryptedValue)
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name)
  },
}

const localStore = () => {
  const storage = createJSONStorage(() => localStorage)

  const encrypted = createJSONStorage(() => ({
    getItem: encryptedStorage.getItem,
    setItem: encryptedStorage.setItem,
    removeItem: encryptedStorage.removeItem,
  }))

  return ENCRYPTION_ENABLED ? encrypted : storage
}

export { localStore }
