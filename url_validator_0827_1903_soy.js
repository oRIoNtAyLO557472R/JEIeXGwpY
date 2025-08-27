// 代码生成时间: 2025-08-27 19:03:57
const https = require('https');
const { URL } = require('url');

/**
 * Validates if a given URL is valid and active.
 *
 * @param {string} url - The URL to validate.
 * @returns {Promise<boolean>} - A promise that resolves to true if the URL is valid and active, false otherwise.
 */
function validateUrl(url) {
  return new Promise((resolve, reject) => {
    // Try to parse the URL
    try {
      const parsedUrl = new URL(url);
    } catch (error) {
      // If URL parsing fails, the URL is invalid
      return reject(new Error('Invalid URL format'));
    }

    // Make an HTTP HEAD request to check the URL's活性
    https.get(parsedUrl, (res) => {
      if (res.statusCode < 400) {
        // If the status code is less than 400, the URL is active
        resolve(true);
      } else {
        // If the status code is 4xx or 5xx, the URL is not active
        resolve(false);
      }
    }).on('error', (error) => {
      // If there is an error making the request, the URL is not active
      resolve(false);
    });
  });
}

/**
 * Example usage of the validateUrl function.
 */
validateUrl('https://www.example.com').then(isValid => {
  if (isValid) {
    console.log('The URL is valid and active.');
  } else {
    console.log('The URL is invalid or inactive.');
  }
}).catch(error => {
  console.error('Error:', error.message);
});