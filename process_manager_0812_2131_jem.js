// 代码生成时间: 2025-08-12 21:31:02
// process_manager.js
// This script is a simple process manager using Node.js native modules.

const { exec } = require('child_process');
const util = require('util');

// Promisify the exec function for easier use with async/await.
const execAsync = util.promisify(exec);

// Function to list all running processes.
async function listProcesses() {
  try {
    // Execute the 'ps' command to list processes.
    const { stdout } = await execAsync('ps -ef');
    console.log(stdout); // Output the list of processes to the console.
  } catch (error) {
    console.error('Failed to list processes:', error);
  }
}

// Function to kill a specific process by its PID.
async function killProcess(pid) {
  if (!pid) {
    throw new Error('Process ID must be provided.');
  }
  try {
    // Execute the 'kill' command with the provided PID.
    const { stdout } = await execAsync(`kill ${pid}`);
    console.log(`Process with PID ${pid} has been killed.`);
  } catch (error) {
    console.error(`Failed to kill process with PID ${pid}:`, error);
  }
}

// Function to search for processes by name.
async function searchProcessesByName(processName) {
  if (!processName) {
    throw new Error('Process name must be provided.');
  }
  try {
    // Execute the 'pgrep' command to find processes by name.
    const { stdout } = await execAsync(`pgrep -f ${processName}`);
    const pids = stdout.trim().split('
');
    if (pids.length === 0) {
      console.log(`No processes found for name: ${processName}`);
    } else {
      console.log(`Process IDs found for name '${processName}':`, pids);
    }
  } catch (error) {
    console.error(`Failed to search for processes named '${processName}':`, error);
  }
}

// Export the functions for use in other modules.
module.exports = {
  listProcesses,
  killProcess,
  searchProcessesByName
};