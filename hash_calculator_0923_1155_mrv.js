// 代码生成时间: 2025-09-23 11:55:13
// Requiring the 'crypto' module from Node.js standard library
const crypto = require('crypto');

/**
 * Calculates the hash for a given input and algorithm.
 * 
 * @param {string} input - The data to be hashed.
 * @param {string} algorithm - The hash algorithm to use (e.g., 'sha256', 'md5').
 * @returns {Promise<string>} - A promise that resolves with the hash value.
 */
function calculateHash(input, algorithm) {
  return new Promise((resolve, reject) => {
    // Check if the algorithm is valid
    if (!crypto.getHashes().includes(algorithm)) {
      return reject(new Error(`Unsupported algorithm: ${algorithm}`));
    }

    // Create a hash instance
    const hash = crypto.createHash(algorithm);

    // Update the hash with the input data
    hash.update(input);

    // Calculate the hash and resolve the promise with the result
    resolve(hash.digest('hex'));
  });
}

// Example usage
calculateHash('Hello, World!', 'sha256')
  .then(hash => {
    console.log(`Hash (SHA-256): ${hash}`);
  })
  .catch(error => {
    console.error(`Error calculating hash: ${error.message}`);
  });
