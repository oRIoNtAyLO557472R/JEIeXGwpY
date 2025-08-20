// 代码生成时间: 2025-08-21 02:38:09
const fs = require('fs');
const Jimp = require('jimp');

/*
 * 图片尺寸批量调整器
 * 用途：调整指定目录下所有图片的尺寸
 * 配置：
 *  - inputDir: 输入目录，包含原始图片
 *  - outputDir: 输出目录，存放调整尺寸后的图片
 *  - desiredSize: 目标尺寸，例如 { width: 800, height: 600 }
 *
 * 注意：确保Jimp库已安装，使用 npm install jimp
 */

class ImageResizer {
  constructor(inputDir, outputDir, desiredSize) {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
    this.desiredSize = desiredSize;
  }

  /*
   * 调整单个图片尺寸
   * @param {string} filePath 文件路径
   * @param {function} callback 回调函数
   */
  resizeImage(filePath, callback) {
    Jimp.read(filePath).then(image => {
      // 保持图片比例
      let ratio = image.bitmap.width / image.bitmap.height;
      let newWidth = this.desiredSize.width;
      let newHeight = Math.round(newWidth / ratio);

      if (newHeight > this.desiredSize.height) {
        newHeight = this.desiredSize.height;
        newWidth = Math.round(newHeight * ratio);
      }

      // 调整图片尺寸
      image.resize(newWidth, newHeight).write(filePath, (err, buffer) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, `Resized ${filePath}`);
        }
      });
    }).catch(err => {
      callback(err, null);
    });
  }

  /*
   * 遍历目录，批量调整图片尺寸
   * @param {function} callback 回调函数
   */
  batchResize(callback) {
    fs.readdir(this.inputDir, (err, files) => {
      if (err) {
        callback(err);
      } else {
        files.forEach(file => {
          let filePath = `${this.inputDir}/${file}`;
          this.resizeImage(filePath, callback);
        });
      }
    });
  }
}

// 使用示例
const inputDir = './input_images';
const outputDir = './output_images';
const desiredSize = { width: 800, height: 600 };

const resizer = new ImageResizer(inputDir, outputDir, desiredSize);

resizer.batchResize((err, message) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log(message);
  }
});