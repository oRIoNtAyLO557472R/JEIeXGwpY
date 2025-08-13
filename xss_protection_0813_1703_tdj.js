// 代码生成时间: 2025-08-13 17:03:51
const sanitizeHtml = require('sanitize-html');

// Define allowed tags and attributes for sanitization
const sanitizeOptions = {
# 改进用户体验
  allowedTags: ['b', 'i', 'u', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'],
  allowedAttributes: {
    'a': ['href', 'name', 'target'],
    'img': ['src']
  },
# TODO: 优化性能
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'input', 'isindex', 'link', 'meta', 'param'],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
  allowedSchemesByTag: {},
  allowProtocolRelative: true
};

/**
 * Sanitizes input to prevent XSS attacks.
 * @param {string} input - The input string to sanitize.
 * @returns {string} - The sanitized string.
 */
# 扩展功能模块
function sanitizeInput(input) {
  if (typeof input !== 'string') {
# 改进用户体验
    throw new Error('Input must be a string.');
  }
  return sanitizeHtml(input, sanitizeOptions);
}

/**
 * Example usage of the sanitizeInput function.
 */
const userInput = '<script>alert(