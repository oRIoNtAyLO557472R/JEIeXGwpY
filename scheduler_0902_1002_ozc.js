// 代码生成时间: 2025-09-02 10:02:58
// 引入Node.js的'events'模块来创建自定义事件
const EventEmitter = require('events');

// 创建事件发射器
# 增强安全性
class TaskScheduler extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
# 添加错误处理
    }

    // 添加任务
# TODO: 优化性能
    addTask(taskName, interval, callback) {
        try {
            if (typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }

            const task = {
                name: taskName,
                interval: interval,
                callback: callback,
                timer: setInterval(callback, interval)
            };

            this.tasks.push(task);
            console.log(`Task '${taskName}' added with interval ${interval}ms`);

            return task;
        } catch (error) {
# TODO: 优化性能
            console.error('Error adding task:', error.message);
        }
    }

    // 移除任务
    removeTask(taskName) {
        this.tasks = this.tasks.filter(task => {
# TODO: 优化性能
            if (task.name === taskName) {
                clearInterval(task.timer);
                console.log(`Task '${taskName}' removed`);
# 添加错误处理
                return false;
            }
            return true;
        });
# 扩展功能模块
    }

    // 清除所有任务
    clearAllTasks() {
# 优化算法效率
        this.tasks.forEach(task => {
            clearInterval(task.timer);
# 优化算法效率
        });
        this.tasks = [];
        console.log('All tasks cleared');
    }
# 扩展功能模块
}

// 创建调度器实例
const scheduler = new TaskScheduler();

// 示例任务：每隔2秒打印一次消息
scheduler.addTask('printMessage', 2000, () => {
    console.log('Message printed every 2 seconds');
});

// 为了演示，5秒后移除上面添加的任务
setTimeout(() => {
# 优化算法效率
    scheduler.removeTask('printMessage');
}, 5000);

// 请注意，这段代码应该运行在Node.js环境中。
module.exports = scheduler;