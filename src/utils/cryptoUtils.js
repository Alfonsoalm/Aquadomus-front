import CryptoJS from "crypto-js";

const encryptionKey = "secret_key"; // Usa una clave segura
// Vector de Inicialización (IV) fijo
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // Un IV de 16 bytes, por ejemplo

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, encryptionKey, { iv: iv }).toString();
};

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey, { iv: iv });
  return bytes.toString(CryptoJS.enc.Utf8);
};
