// 代码生成时间: 2025-10-01 03:58:22
const fs = require('fs');
const crypto = require('crypto');

// 配置加密算法和密钥
const algorithm = 'aes-256-ctr';
const key = 'your-very-secure-key-here';

// 加密文件
function encryptFile(filename, outputPath) {
    try {
        // 读取文件内容
        const input = fs.readFileSync(filename);
        // 使用密钥创建加密算法的cipher
        const cipher = crypto.createCipher(algorithm, key);
        // 加密文件内容
        let encrypted = cipher.update(input, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        // 将加密后的内容写入输出文件
        fs.writeFileSync(outputPath, encrypted);
        console.log('File encrypted successfully!');
    } catch (err) {
        console.error('Error encrypting file:', err);
    }
}

// 解密文件
function decryptFile(filename, outputPath) {
    try {
        // 读取加密文件内容
        const input = fs.readFileSync(filename, 'utf8');
        // 使用密钥创建解密算法的decipher
        const decipher = crypto.createDecipher(algorithm, key);
        // 解密文件内容
        let decrypted = decipher.update(input, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        // 将解密后的内容写入输出文件
        fs.writeFileSync(outputPath, decrypted);
        console.log('File decrypted successfully!');
    } catch (err) {
        console.error('Error decrypting file:', err);
    }
}

// 程序的主入口点，处理命令行参数
function main() {
    if (process.argv.length < 4) {
        console.log('Usage: node file_encryption_decryption_tool.js <command> <inputFile> <outputFile>');
        console.log('Commands: encrypt, decrypt');
        process.exit(1);
    }
    const command = process.argv[2];
    const inputFile = process.argv[3];
    const outputFile = process.argv[4];

    if (command === 'encrypt') {
        encryptFile(inputFile, outputFile);
    } else if (command === 'decrypt') {
        decryptFile(inputFile, outputFile);
    } else {
        console.log('Invalid command. Use 