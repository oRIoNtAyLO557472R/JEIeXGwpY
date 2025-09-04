// 代码生成时间: 2025-09-04 17:26:46
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp'); // 引入Jimp库来处理图片

/**
 * 调整图片尺寸
 * @param {string} sourceImagePath - 源图片路径
 * @param {string} targetFolderPath - 目标文件夹路径
 * @param {number} newWidth - 新的宽度
 * @param {number} newHeight - 新的高度
 */
async function resizeImage(sourceImagePath, targetFolderPath, newWidth, newHeight) {
  // 检查文件是否存在
  if (!fs.existsSync(sourceImagePath)) {
    console.error('Source image file does not exist.');
    return;
  }

  // 读取图片文件
  try {
    let image = await Jimp.read(sourceImagePath);
    // 调整图片尺寸
    image.resize(newWidth, newHeight).write(path.join(targetFolderPath, path.basename(sourceImagePath)));
    console.log('Image resized successfully.');
  } catch (error) {
    console.error('Failed to resize image:', error);
  }
}

/**
 * 批量调整文件夹内所有图片的尺寸
 * @param {string} sourceFolderPath - 源文件夹路径
 * @param {string} targetFolderPath - 目标文件夹路径
 * @param {number} newWidth - 新的宽度
 * @param {number} newHeight - 新的高度
 */
async function batchResizeImages(sourceFolderPath, targetFolderPath, newWidth, newHeight) {
  // 确保目标文件夹存在，如果不存在则创建它
  if (!fs.existsSync(targetFolderPath)) {
    fs.mkdirSync(targetFolderPath);
  }

  // 读取源文件夹内所有文件
  fs.readdir(sourceFolderPath, async (err, files) => {
    if (err) {
      console.error('Error reading source folder:', err);
      return;
    }

    for (const file of files) {
      const sourceImagePath = path.join(sourceFolderPath, file);
      const targetImagePath = path.join(targetFolderPath, file);
      await resizeImage(sourceImagePath, targetFolderPath, newWidth, newHeight);
    }
  });
}

// 示例用法
const sourceFolderPath = './images/'; // 源文件夹路径
const targetFolderPath = './resized_images/'; // 目标文件夹路径
const newWidth = 800; // 新宽度
const newHeight = 600; // 新高度

batchResizeImages(sourceFolderPath, targetFolderPath, newWidth, newHeight);
