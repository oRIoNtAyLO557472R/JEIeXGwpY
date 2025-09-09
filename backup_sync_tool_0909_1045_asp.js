// 代码生成时间: 2025-09-09 10:45:45
// backup_sync_tool.js
// 这是一个简单的文件备份和同步工具，使用Node.js编写。

const fs = require('fs');
const path = require('path');

// 配置源目录和目标目录
const sourceDir = './source';
const targetDir = './target';

// 创建目标目录的函数
function ensureTargetDirectoryExists() {
  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  } catch (error) {
    console.error('创建目标目录时出错:', error);
    process.exit(1);
  }
}

// 复制单个文件的函数
function copyFile(source, target) {
  try {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(target);

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
    });
  } catch (error) {
    console.error('复制文件时出错:', error);
    throw error;
  }
}

// 递归备份和同步文件夹的函数
function backupAndSyncDirectory(source, target) {
  fs.readdir(source, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error('读取源目录时出错:', error);
      throw error;
    }

    files.forEach(file => {
      const sourcePath = path.join(source, file.name);
      const targetPath = path.join(target, file.name);

      if (file.isDirectory()) {
        // 如果是目录，则递归调用
        backupAndSyncDirectory(sourcePath, targetPath);
      } else if (file.isFile()) {
        // 如果是文件，则复制文件
        copyFile(sourcePath, targetPath)
          .then(() => console.log(`文件 ${file.name} 已同步`))
          .catch(error => console.error(`同步文件 ${file.name} 时出错`, error));
      }
    });
  });
}

// 程序入口点
function main() {
  ensureTargetDirectoryExists();
  backupAndSyncDirectory(sourceDir, targetDir);
  console.log('备份和同步完成。');
}

// 调用主函数启动程序
main();