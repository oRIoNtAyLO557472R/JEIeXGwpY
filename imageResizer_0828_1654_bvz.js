// 代码生成时间: 2025-08-28 16:54:35
const fs = require('fs');
const Jimp = require('jimp');

/**
 * Resizes an image to the specified dimensions.
 * @param {string} imageLocation - The path to the image file.
 * @param {number} newWidth - The new width of the image.
 * @param {number} newHeight - The new height of the image.
 * @returns {Promise<void>} - A promise that resolves when the image is resized.
 */
function resizeImage(imageLocation, newWidth, newHeight) {
  return Jimp.read(imageLocation)
    .then(image => image.resize(newWidth, newHeight))
    .then(image => image.write(imageLocation))
    .catch(error => {
      console.error(`Failed to resize image at ${imageLocation}. Error: ${error.message}`);
    });
}

/**
 * Resizes all images in a directory to the specified dimensions.
 * @param {string} directory - The path to the directory containing images.
 * @param {number} newWidth - The new width of the images.
 * @param {number} newHeight - The new height of the images.
 */
function resizeImagesInDirectory(directory, newWidth, newHeight) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Failed to read directory ${directory}. Error: ${err.message}`);
      return;
    }

    files.forEach(file => {
      const filePath = `${directory}/${file}`;
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Failed to get stats for file ${filePath}. Error: ${err.message}`);
          return;
        }

        // Only process image files.
        if (stats.isFile() && Jimp.supports(file)) {
          resizeImage(filePath, newWidth, newHeight);
        }
      });
    });
  });
}

// Example usage:
// resizeImagesInDirectory('./images', 800, 600);

// Export the function for use in other modules
module.exports = {
  resizeImage,
  resizeImagesInDirectory
};