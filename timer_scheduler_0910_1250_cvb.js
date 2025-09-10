// 代码生成时间: 2025-09-10 12:50:58
const { setInterval, clearInterval } = require('timers');

class TimerScheduler {
  /**
   * 构造函数，初始化定时任务调度器。
   * @param {Function} task - 需要定时执行的任务。
   * @param {number} interval - 执行任务的间隔时间（毫秒）。
   */
  constructor(task, interval) {
    this.task = task;
    this.interval = interval;
    this.timer = null;
  }

  /**
   * 开始执行定时任务。
   */
  start() {
    if (this.timer) {
      console.error('Timer is already running.');
      return;
    }

    this.timer = setInterval(this.task, this.interval);
    console.log('Timer started.');
  }

  /**
   * 停止执行定时任务。
   */
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      console.log('Timer stopped.');
    } else {
      console.error('Timer is not running.');
    }
  }

  /**
   * 更新定时任务的执行间隔。
   * @param {number} newInterval - 新的执行间隔时间（毫秒）。
   */
  updateInterval(newInterval) {
    if (!this.timer) {
      console.error('Timer is not running.');
      return;
    }

    clearInterval(this.timer);
    this.interval = newInterval;
    this.timer = setInterval(this.task, newInterval);
    console.log('Timer interval updated.');
  }
}

// 使用示例
const task = () => {
  console.log('Task executed at:', new Date().toISOString());
};

// 创建定时任务调度器实例
const scheduler = new TimerScheduler(task, 5000); // 每5秒执行一次任务

// 开始执行定时任务
scheduler.start();

// 在某个时间点停止执行定时任务
// scheduler.stop();

// 更新定时任务的执行间隔
// scheduler.updateInterval(10000); // 更新为每10秒执行一次任务
