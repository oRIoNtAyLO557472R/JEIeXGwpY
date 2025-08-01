// 代码生成时间: 2025-08-02 07:02:49
const os = require('os');

const { exec } = require('child_process');

const fs = require('fs');

const path = require('path');


/**
 * Get the current memory usage percentage.
 * @returns {Promise<number>} A promise that resolves to the memory usage percentage.
 */
async function getMemoryUsage() {

  return new Promise((resolve, reject) => {

    exec('free -m', (error, stdout, stderr) => {

      if (error) {

        reject(error);

      } else if (stderr) {

        console.error('Error:', stderr);

        reject(new Error('Error running free command'));

      } else {

        const lines = stdout.split('
');

        const memTotal = parseInt(lines[1].split()[1], 10);

        const memUsed = parseInt(lines[1].split()[2], 10);

        const memUsage = ((memTotal - memUsed) / memTotal) * 100;

        resolve(memUsage);

      }

    });

  });

}


/**
 * Log the memory usage to a file.
 * @param {number} memoryUsage The memory usage percentage to log.
 */
function logMemoryUsage(memoryUsage) {

  const timestamp = new Date().toISOString();

  const logMessage = `${timestamp} - Memory Usage: ${memoryUsage.toFixed(2)}%\
`;

  const logFilePath = path.join(__dirname, 'memory_usage.log');

  fs.appendFile(logFilePath, logMessage, (error) => {

    if (error) {

      console.error('Failed to log memory usage:', error);

    } else {

      console.log('Memory usage logged successfully.');

    }

  });

}


/**
 * Main function to analyze memory usage.
 */
async function analyzeMemory() {

  try {

    const memoryUsage = await getMemoryUsage();

    console.log(`Current memory usage: ${memoryUsage.toFixed(2)}%`);

    logMemoryUsage(memoryUsage);

  } catch (error) {

    console.error('Error analyzing memory:', error);

  }

}


// Run the memory analysis when the script is executed.

analyzeMemory();
