// Encrypt data using a basic algorithm (for example purposes, not suitable for production)
const encryptData = (data) => {
  return btoa(unescape(encodeURIComponent(data)));
};

// Decrypt data using a basic algorithm (for example purposes, not suitable for production)
const decryptData = (data) => {
  return decodeURIComponent(escape(atob(data)));
};

// Save data to local storage securely
export const saveToLocalStorage = (key, value) => {
  const encryptedValue = encryptData(JSON.stringify(value));
  localStorage.setItem(key, encryptedValue);
};

// Retrieve data from local storage securely
export const getFromLocalStorage = (key) => {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) return null;
  const decryptedValue = decryptData(encryptedValue);
  return JSON.parse(decryptedValue);
};

// Remove data from local storage
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
