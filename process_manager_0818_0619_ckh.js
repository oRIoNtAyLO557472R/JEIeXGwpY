// 代码生成时间: 2025-08-18 06:19:56
// Import the 'child_process' module to interact with system processes
const { exec } = require('child_process');

/**
 * Lists all running processes on the system.
 * @returns {Promise<Array>} A promise that resolves to an array of process objects.
 */
function listProcesses() {
  return new Promise((resolve, reject) => {
    // Use the 'ps' command to list processes
    exec('ps aux', (error, stdout, stderr) => {
      if (error) {
        // Handle any errors that occur during execution
        reject(new Error(`Failed to list processes: ${error.message}`));
        return;
      }
      // Split the output into lines and parse each line into a process object
      const processes = stdout.split('
').slice(1).map(line => {
        const parts = line.split(/\s+/);
        return {
          user: parts[0],
          pid: parseInt(parts[1], 10),
          cpu: parts[2],
          mem: parts[3],
          vsz: parts[4],
          rss: parts[5],
          tt: parts[6],
          stat: parts[7],
          start: parts[8],
          time: parts[9],
          command: parts.slice(10).join(' ')
        };
      });
      // Resolve the promise with the list of process objects
      resolve(processes);
    });
  });
}

/**
 * Terminates a process by its PID.
 * @param {number} pid - The process ID to terminate.
 * @returns {Promise<void>} A promise that resolves when the process is terminated.
 */
function terminateProcess(pid) {
  return new Promise((resolve, reject) => {
    // Use the 'kill' command to terminate the process
    exec(`kill ${pid}`, (error, stdout, stderr) => {
      if (error) {
        // Handle any errors that occur during execution
        reject(new Error(`Failed to terminate process ${pid}: ${error.message}`));
        return;
      }
      // Resolve the promise once the process is terminated
      resolve();
    });
  });
}

// Example usage:
listProcesses()
  .then(processes => {
    console.log('Running processes:', processes);
    // Terminate a process by its PID (e.g., 1234)
    return terminateProcess(1234);
  })
  .then(() => {
    console.log('Process terminated successfully.');
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
