// 代码生成时间: 2025-08-20 05:26:49
// fileExtractor.js
// 一个简单的文件压缩解压工具

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const extract = require('extract-zip');

/**
 * 压缩文件
 * @param {string} sourceFolder - 要压缩的文件夹路径
 * @param {string} outputZip - 输出的zip文件路径
 * @returns {Promise<void>}
 */
async function compressFiles(sourceFolder, outputZip) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputZip);
    const archive = archiver('zip', { zlib: { level: 9 } }); // 设置压缩级别
    output.on('close', function () {
      console.log('压缩完成，总共 ' + archive.pointer() + ' 字节');
      resolve();
    });
    archive.on('error', function(err) {
      reject(err);
    });
    archive.pipe(output);
    archive.directory(sourceFolder, path.basename(sourceFolder));
    archive.finalize();
  });
}

/**
 * 解压文件
 * @param {string} zipFilePath - zip文件路径
 * @param {string} outputFolder - 解压后的文件夹路径
 * @returns {Promise<void>}
 */
async function extractFiles(zipFilePath, outputFolder) {
  return new Promise((resolve, reject) => {
    extract(zipFilePath, { dir: outputFolder }, function(err) {
      if (err) {
        reject(err);
      } else {
        console.log('解压完成');
        resolve();
      }
    });
  });
}

// 错误处理和命令行接口可以在这里添加，例如使用yargs等库来处理命令行参数

module.exports = {
  compressFiles,
  extractFiles
};