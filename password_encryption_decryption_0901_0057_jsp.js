// 代码生成时间: 2025-09-01 00:57:43
const crypto = require('crypto');

class PasswordManager {
  /**
   * Encrypts a password using AES-256-CBC.
   * @param {string} password - The password to encrypt.
   * @param {string} key - The encryption key.
   * @param {string} iv - The initialization vector.
   * @returns {Buffer} - The encrypted password.
   */
  static encryptPassword(password, key, iv) {
    try {
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
      let encrypted = cipher.update(password, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return Buffer.from(encrypted, 'hex');
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  }

  /**
   * Decrypts a password using AES-256-CBC.
   * @param {Buffer} encryptedPassword - The encrypted password to decrypt.
   * @param {string} key - The decryption key.
   * @param {string} iv - The initialization vector.
   * @returns {string} - The decrypted password.
   */
  static decryptPassword(encryptedPassword, key, iv) {
    try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
      let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }
}

// Example usage
const key = 'your-256-bit-encryption-key'; // 32 characters long
const iv = 'your-initialization-vector'; // 16 characters long
const password = 'YourSecurePassword123';

// Encrypt the password
const encryptedPassword = PasswordManager.encryptPassword(password, key, iv);
console.log('Encrypted Password:', encryptedPassword.toString('hex'));

// Decrypt the password
const decryptedPassword = PasswordManager.decryptPassword(encryptedPassword, key, iv);
console.log('Decrypted Password:', decryptedPassword);
