// 代码生成时间: 2025-08-29 12:34:16
// scheduler.js - A simple task scheduler using Node.js

/**
 * Import required modules
 * @type {{scheduleJob: Function, cancelJob: Function}}
 */
const { scheduleJob } = require('node-cron');

/**
 * A simple function to simulate a task
 * @param {string} name - The name of the task
 */
function task(name) {
  console.log(`Task ${name} is running...`);
}

/**
 * Schedules a new job with the provided cron pattern
 * @param {string} pattern - The cron pattern for the job
 * @param {string} taskName - The name of the task to run
 * @returns {Function} - A function to cancel the job
 */
function scheduleTask(pattern, taskName) {
  // Schedule a new job using the provided cron pattern
  const job = scheduleJob(pattern, () => task(taskName));
  
  // Return a function to cancel the job
  return () => job.stop();
}

/**
 * Main function to run the scheduler
 * @returns {void}
 */
function runScheduler() {
  try {
    // Schedule a task to run every day at 12:00 AM
    const dailyTask = scheduleTask('0 0 * * *', 'Daily Task');
    
    // Schedule a task to run every hour on the 30th minute
    const hourlyTask = scheduleTask('30 * * * *', 'Hourly Task');
  } catch (error) {
    console.error('Error scheduling tasks:', error);
  }
}

// Run the scheduler on program start
runScheduler();

// Export the scheduleTask function for testing or other modules
module.exports = { scheduleTask };