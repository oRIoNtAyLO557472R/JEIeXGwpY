// 代码生成时间: 2025-08-22 15:16:34
const crypto = require('crypto');

/**
 * Function to encrypt a password with a given key.
 * @param {string} password - The password to be encrypted.
 * @param {string} key - The key used for encryption.
 * @returns {string} - The encrypted password as a hexadecimal string.
 */
function encryptPassword(password, key) {
  // Ensure the password and key are not empty
  if (!password || !key) {
    throw new Error('Password and key cannot be empty.');
  }
  
  // Create a cipher instance with AES-256-CBC encryption algorithm
  const cipher = crypto.createCipher('aes-256-cbc', key);
  
  // Encrypt the password and return the result as a hexadecimal string
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * Function to decrypt a password with a given key.
 * @param {string} encryptedPassword - The encrypted password to be decrypted.
 * @param {string} key - The key used for decryption.
 * @returns {string} - The decrypted password.
 */
function decryptPassword(encryptedPassword, key) {
  // Ensure the encrypted password and key are not empty
  if (!encryptedPassword || !key) {
    throw new Error('Encrypted password and key cannot be empty.');
  }
  
  // Create a decipher instance with AES-256-CBC encryption algorithm
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  
  // Decrypt the password and return the result
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage:
try {
  const key = 'your-encryption-key'; // Replace with your actual key
  const password = 'your-password';

  const encrypted = encryptPassword(password, key);
  console.log('Encrypted Password:', encrypted);

  const decrypted = decryptPassword(encrypted, key);
  console.log('Decrypted Password:', decrypted);
} catch (error) {
  console.error('Error:', error.message);
}