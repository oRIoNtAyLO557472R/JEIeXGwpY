// 代码生成时间: 2025-08-04 17:22:20
const fs = require('fs');
const path = require('path');

// 定义一个函数用于批量重命名文件
function batchRenameFiles(directory, renamePattern) {
  // 检查目录是否存在
  if (!fs.existsSync(directory)) {
    throw new Error(`Directory not found: ${directory}`);
  }

  // 获取目录中所有文件
  const files = fs.readdirSync(directory);

  // 遍历所有文件
  files.forEach((file, index) => {
    const oldPath = path.join(directory, file);

    // 检查是否是文件
    if (fs.statSync(oldPath).isFile()) {
      // 根据重命名规则生成新文件名
      const newName = renamePattern(file, index);
      const newPath = path.join(directory, newName);

      // 重命名文件
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${file} to ${newName}`);
    } else {
      console.log(`Skipping ${file}, not a file`);
    }
  });
}

// 示例重命名规则：在文件名前添加前缀'new_'
function addPrefixRenamePattern(filename) {
  return `new_${filename}`;
}

// 使用示例
// 调用批量重命名函数，需指定目录和重命名规则
// 请确保你有权限访问该目录，并在该目录中放置需要重命名的文件
// batchRenameFiles('./path/to/your/directory', addPrefixRenamePattern);

// 注意：
// 1. 请替换'./path/to/your/directory'为你想要重命名文件的目录路径。
// 2. 如果你的目录中有子目录，请考虑是否需要递归处理子目录中的文件。
// 3. 此脚本会直接更改文件名，建议在执行前备份重要文件。

module.exports = {
  batchRenameFiles,
  addPrefixRenamePattern
};
