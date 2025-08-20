// 代码生成时间: 2025-08-20 19:38:37
const util = require('util');
const { format } = require('date-fns');

/**
 * Formats the API response with a standard structure.
 * @param {Object} data - The data to be formatted in the response.
 * @param {Object} [meta] - Optional metadata to include in the response.
 * @returns {Object} A formatted API response object.
 */
function formatResponse(data, meta = {}) {
  // Construct the standard response structure
  return {
    "statusCode": 200,
    "message": "Success",
    "data": data,
    "meta": meta,
    "timestamp": format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ssXXX')
  };
}

/**
 * Handles errors and formats error responses.
 * @param {Object} error - The error object to be formatted.
 * @returns {Object} A formatted error response object.
 */
function formatErrorResponse(error) {
  // Check if an error object is provided
  if (!error) {
    throw new Error('An error object is required to format an error response.');
  }
  
  // Extract the error message and stack trace if available
  const errorMessage = error.message;
  const errorStack = util.inspect(error.stack);
  
  // Construct the error response structure
  return {
    "statusCode": error.statusCode || 500,
    "message": errorMessage || 'An unknown error occurred.',
    "error": errorStack,
    "timestamp": format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ssXXX')
  };
}

// Export the API response formatter functions
module.exports = {
  formatResponse,
  formatErrorResponse
};