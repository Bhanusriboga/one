import CryptoJS from 'crypto-js';
const SECRET_KEY = 'mysecretkey'; 

const encryptData =(data)=> {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}
const decryptData = (data) => {
  const encrypted = localStorage.getItem(data);
  const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

// Save data to local storage securely
export const saveToLocalStorage = (key, value) => {
  const encryptedValue = encryptData(JSON.stringify(value), SECRET_KEY);
  localStorage.setItem(key, encryptedValue);
};

// Retrieve data from local storage securely
export const getFromLocalStorage = (key) => {
  const encryptedValue = localStorage.getItem(key);
  console.log({encryptedValue})
  if (!encryptedValue) return null;
  const decryptedValue = decryptData(encryptedValue);
  return JSON.parse(decryptedValue);
};

// Remove data from local storage
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
