// 代码生成时间: 2025-09-07 09:27:13
const escapeHtml = require('escape-html');

/**
 * Function to sanitize input and prevent XSS attacks.
 * @param {string} input - The user input to be sanitized.
 * @returns {string} - The sanitized input.
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Input must be a string.');
  }

  // Use escape-html library to prevent XSS attacks by escaping HTML entities.
  const sanitizedInput = escapeHtml(input);
  return sanitizedInput;
}

/**
 * Example usage of sanitizeInput function.
 */
try {
  const userInput = '<script>alert("XSS")</script>';
  const safeInput = sanitizeInput(userInput);
  console.log('Safe Input:', safeInput);
} catch (error) {
  console.error('Error:', error.message);
}
