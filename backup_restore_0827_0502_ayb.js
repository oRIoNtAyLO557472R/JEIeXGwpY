// 代码生成时间: 2025-08-27 05:02:07
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// 函数：备份数据
function backupData(sourcePath, backupPath) {
  fs.readFile(sourcePath, (err, data) => {
    if (err) {
      console.error('Error reading source file:', err);
      return;
    }

    // 压缩数据
    zlib.gzip(data, (err, buffer) => {
      if (err) {
        console.error('Error compressing data:', err);
        return;
      }

      // 写入备份文件
      fs.writeFile(backupPath, buffer, (err) => {
        if (err) {
          console.error('Error writing backup file:', err);
          return;
        }

        console.log('Backup created successfully:', backupPath);
      });
    });
  });
}

// 函数：恢复数据
function restoreData(backupPath, destinationPath) {
  fs.readFile(backupPath, (err, buffer) => {
    if (err) {
      console.error('Error reading backup file:', err);
      return;
    }

    // 解压缩数据
    zlib.unzip(buffer, (err, buffer) => {
      if (err) {
        console.error('Error uncompressing data:', err);
        return;
      }

      // 写入恢复文件
      fs.writeFile(destinationPath, buffer, (err) => {
        if (err) {
          console.error('Error writing restored file:', err);
          return;
        }

        console.log('Data restored successfully:', destinationPath);
      });
    });
  });
}

// 使用示例
const sourcePath = 'data.json';
const backupPath = 'data_backup.gz';
const destinationPath = 'data_restored.json';

backupData(sourcePath, backupPath);
restoreData(backupPath, destinationPath);