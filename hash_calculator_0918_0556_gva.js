// 代码生成时间: 2025-09-18 05:56:38
 * for strings and files using cryptographic hash functions.
 *
 * @author {Your Name}
 * @version 1.0.0
 * @license MIT
 */

// Importing the 'crypto' module from Node.js for cryptographic functions
const crypto = require('crypto');

// Function to calculate hash for a given string
function calculateStringHash(string, algorithm = 'sha256') {
    // Using crypto.createHash to create a hash instance
    return crypto.createHash(algorithm).update(string).digest('hex');
}

// Function to calculate hash for a file
function calculateFileHash(filePath, algorithm = 'sha256', callback) {
    // Read the file asynchronously
    const hash = crypto.createHash(algorithm);

    const fileStream = require('fs').createReadStream(filePath);

    // Pipe the file stream into the hash instance
    fileStream.on('error', (err) => {
        // Handle file read error
        callback(err, null);
    });

    fileStream.on('data', (chunk) => {
        // Update the hash instance with file chunks
        hash.update(chunk);
    });

    fileStream.on('end', () => {
        // After the file is fully read, calculate the hash and invoke the callback
        callback(null, hash.digest('hex'));
    });
}

// Export the functions for use in other modules
module.exports = {
    calculateStringHash,
    calculateFileHash
};
