import { encryptionSalt } from "../config/config";

const encryption = (text) => {
  const textToChars = (text) =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(encryptionSalt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decryption = (encoded) => {
  const textToChars = (text) =>
    text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(encryptionSalt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    ?.map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

const get = (key) => {
  try {
    const data = localStorage.getItem(key);
    const decryptedData = data && decryption(data);
    return decryptedData && JSON.parse(decryptedData);
  } catch (error) {
    return undefined;
  }
};

const set = (key, value) => {
  try {
    localStorage.setItem(key, encryption(JSON.stringify(value)));
    return value;
  } catch (error) {
    return false;
  }
};

const remove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

const Storage = {
  get,
  set,
  remove,
  clearAll,
};

export default Storage;
