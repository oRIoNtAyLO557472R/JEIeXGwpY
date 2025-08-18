// 代码生成时间: 2025-08-19 06:50:17
const crypto = require('crypto');

/**
 * Password Encryption and Decryption Tool
 * This tool uses Node.js crypto module to encrypt and decrypt passwords.
# TODO: 优化性能
 *
 * @author Your Name
 * @version 1.0
 * @since 2023-04-01
 */

class PasswordTool {
  // Encrypts a password using AES-256-CBC algorithm
  static encryptPassword(password, secretKey) {
    try {
      // Generate a random initialization vector (IV)
      const iv = crypto.randomBytes(16);
      // Create a cipher using the secret key and IV
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
# 添加错误处理
      // Encrypt the password
      let encrypted = cipher.update(password);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      // Return the IV and encrypted password as a single buffer
      return Buffer.concat([iv, encrypted]).toString('hex');
    } catch (error) {
# 添加错误处理
      console.error('Error encrypting password:', error.message);
      throw error;
    }
  }

  // Decrypts a password using AES-256-CBC algorithm
  static decryptPassword(encryptedPassword, secretKey) {
# NOTE: 重要实现细节
    try {
      // Convert the encrypted password to a buffer
      const encryptedPasswordBuffer = Buffer.from(encryptedPassword, 'hex');
      // Extract the IV from the first 16 bytes
      const iv = encryptedPasswordBuffer.slice(0, 16);
      // Extract the encrypted password from the remaining bytes
      const encrypted = encryptedPasswordBuffer.slice(16);
      // Create a decipher using the secret key and IV
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
      // Decrypt the password
      let decrypted = decipher.update(encrypted);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
# TODO: 优化性能
      // Return the decrypted password as a string
# FIXME: 处理边界情况
      return decrypted.toString();
    } catch (error) {
      console.error('Error decrypting password:', error.message);
      throw error;
    }
  }
}

// Example usage
const secretKey = 'your-secret-key';
const password = 'your-password';

const encrypted = PasswordTool.encryptPassword(password, secretKey);
console.log('Encrypted:', encrypted);

const decrypted = PasswordTool.decryptPassword(encrypted, secretKey);
console.log('Decrypted:', decrypted);