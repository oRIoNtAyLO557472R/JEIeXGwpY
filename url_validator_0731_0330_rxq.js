// 代码生成时间: 2025-07-31 03:30:36
const https = require('https');
const http = require('http');

/*
 * Function to validate the URL's existence by making a HEAD request.
 * @param {string} url - The URL to be validated.
 * @param {Function} callback - A callback function to handle the result.
 */
function validateUrl(url, callback) {
  // Check if the protocol is specified, if not default to http:
  if (!url.match(/^https?:/)) {
    url = 'http://' + url;
  }

  const protocol = url.startsWith('https') ? https : http;
  protocol.get(url, (res) => {
    if (res.statusCode === 200) {
      // The URL is valid and reachable.
      callback(null, true);
    } else {
      // The URL is not reachable or the server returned a non-200 status code.
      callback(null, false);
    }
  }).on('error', (err) => {
    // An error occurred, the URL is invalid or unreachable.
    callback(err, false);
  });
}

/*
 * Example usage:
 * validateUrl('http://example.com', (err, isValid) => {
 *   if (err) {
 *     console.error('Error validating URL:', err);
 *   } else {
 *     console.log('URL is valid:', isValid);
 *   }
 * });
 */

// Export the validateUrl function for use in other modules.
module.exports = validateUrl;