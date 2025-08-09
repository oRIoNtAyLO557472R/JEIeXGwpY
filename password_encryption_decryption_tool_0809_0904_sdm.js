// 代码生成时间: 2025-08-09 09:04:41
const crypto = require('crypto');

// Encryption function
const encryptPassword = (password) => {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');

  // Create a hash with the password and salt
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

  // Return the hash and salt
  return {
    hash: hash,
    salt: salt
  };
};

// Decryption function
const decryptPassword = (storedHash, storedSalt, password) => {
  // Create a hash with the password and salt from the stored values
  const hash = crypto.pbkdf2Sync(password, storedSalt, 100000, 64, 'sha512').toString('hex');

  // Compare the created hash with the stored hash
  return storedHash === hash;
};

// Export the functions for use in other modules
module.exports = {
  encryptPassword,
  decryptPassword
};