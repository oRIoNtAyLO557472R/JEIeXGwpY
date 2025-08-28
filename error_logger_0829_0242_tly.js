// 代码生成时间: 2025-08-29 02:42:48
const fs = require('fs');
const path = require('path');

// ErrorLogger class definition
class ErrorLogger {
  // Constructor to initialize the ErrorLogger with a file path
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Method to log an error message
  logError(errorMessage) {
    try {
      // Append the error message to the file with a timestamp
      const timestamp = new Date().toISOString();
      const logMessage = `${timestamp} - ERROR: ${errorMessage}
`;

      // Write the log message to the file
      fs.appendFileSync(this.filePath, logMessage, 'utf8');

      console.log(`Error logged: ${errorMessage}`);
    } catch (error) {
      // Handle any errors that occur during logging
      console.error(`Failed to log error: ${error}`);
    }
  }
}

// Usage example
// Create an instance of ErrorLogger pointing to a log file
const errorLogPath = path.join(__dirname, 'error.log');
const logger = new ErrorLogger(errorLogPath);

// Simulate an error and log it
logger.logError('Something went wrong!');

module.exports = ErrorLogger; // Export the ErrorLogger class for use in other files
