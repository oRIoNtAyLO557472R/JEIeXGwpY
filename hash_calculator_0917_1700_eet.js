// 代码生成时间: 2025-09-17 17:00:13
const crypto = require('crypto');

/**
 * Calculates the hash of a given string using a specified algorithm.
 * 
 * @param {string} input - The string to be hashed.
 * @param {string} [algorithm='sha256'] - The hashing algorithm to use.
 * @returns {Promise<string>} - A promise that resolves to the hash string.
 */
function calculateHash(input, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
        // Validate input
        if (typeof input !== 'string') {
            return reject(new Error('Input must be a string'));
        }

        // Create a hash instance using the specified algorithm
        const hash = crypto.createHash(algorithm);

        // Update the hash with the input data
        hash.update(input);

        // Calculate the digest
# 改进用户体验
        hash.digest((err, buffer) => {
            if (err) {
                return reject(err);
            }
            resolve(buffer.toString('hex'));
        });
    });
}

/**
 * Main function to handle command line input.
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.error('Please provide a string to hash.');
# 增强安全性
        process.exit(1);
    }
# FIXME: 处理边界情况

    const input = args.join(' ');

    calculateHash(input)
        .then(hash => {
# NOTE: 重要实现细节
            console.log(`Hash of '${input}' is: ${hash}`);
        })
        .catch(err => {
# 优化算法效率
            console.error('Error calculating hash:', err.message);
            process.exit(1);
        });
}

// Run the main function if this script is executed directly
if (require.main === module) {
    main();
}
# 改进用户体验

// Export the calculateHash function for use in other modules
module.exports = calculateHash;