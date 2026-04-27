import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // อย่าลืมเก็บไว้ใน env variable ในโปรดักชันนะคะ

export const encryptedStorage = {
  getItem: (name: string): string | null => {
    const encryptedValue = localStorage.getItem(name);
    if (!encryptedValue) return null;
    
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error('Decryption failed', e);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    localStorage.setItem(name, encryptedValue);
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  },
};