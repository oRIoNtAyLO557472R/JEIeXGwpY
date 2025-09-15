// 代码生成时间: 2025-09-15 10:25:18
 * Tasks can be added to the scheduler with a specified interval and callback function.
# 扩展功能模块
 * The scheduler will automatically run these tasks at the specified interval.
 */

const { setInterval } = require('timers');

class Scheduler {
  /**
   * Initialize the scheduler with an empty list of tasks.
   */
# NOTE: 重要实现细节
  constructor() {
    this.tasks = [];
  }

  /**
# 改进用户体验
   * Add a task to the scheduler.
   * @param {number} interval - The interval at which the task should run, in milliseconds.
   * @param {function} callback - The function to execute at the specified interval.
   */
# NOTE: 重要实现细节
  addTask(interval, callback) {
# TODO: 优化性能
    const task = setInterval(callback, interval);
# TODO: 优化性能
    this.tasks.push(task);
    console.log(`Task added with interval ${interval}ms`);
# NOTE: 重要实现细节
  }

  /**
   * Remove a task from the scheduler.
# TODO: 优化性能
   * @param {number} taskIndex - The index of the task to remove.
   */
  removeTask(taskIndex) {
    if (this.tasks[taskIndex]) {
      clearInterval(this.tasks[taskIndex]);
      this.tasks.splice(taskIndex, 1);
      console.log(`Task at index ${taskIndex} removed`);
    } else {
      console.error('Task index out of range');
    }
  }

  /**
   * Remove all tasks from the scheduler.
   */
  removeAllTasks() {
    this.tasks.forEach((task) => clearInterval(task));
    this.tasks = [];
    console.log('All tasks removed');
  }
}

// Example usage:
const scheduler = new Scheduler();

// Add a task that logs 'Hello, world!' every 2 seconds.
scheduler.addTask(2000, () => {
  console.log('Hello, world!');
});
# 扩展功能模块

// Remove the task after 10 seconds.
setTimeout(() => {
  scheduler.removeTask(0);
# 优化算法效率
}, 10000);

module.exports = Scheduler; // Export the Scheduler class for use in other modules.