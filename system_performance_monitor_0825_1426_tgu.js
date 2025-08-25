// 代码生成时间: 2025-08-25 14:26:12
const os = require('os');
const { performance } = require('perf_hooks');

// 系统性能监控工具
class SystemPerformanceMonitor {

  // 构造函数，初始化监控周期
  constructor(interval) {
    this.interval = interval;
    this.lastCpuUsage = 0; // 上次CPU使用率
  }

  // 开始监控
  start() {
    console.log('系统性能监控已启动');
    setInterval(() => this.monitor(), this.interval);
  }

  // 监控系统性能
  monitor() {
    try {
      // 获取CPU使用率
      const cpuUsage = this.getCurrentCpuUsage();
      console.log(`当前CPU使用率: ${cpuUsage}%`);
      // 获取系统内存使用情况
      const memUsage = this.getMemoryUsage();
      console.log(`内存使用情况：${memUsage.usedMB}MB已使用，${memUsage.freeMB}MB空闲，共${memUsage.totalMB}MB`);
      // 获取系统负载
      const load = this.getSystemLoad();
      console.log(`系统负载：1分钟平均负载${load[0]}, 5分钟平均负载${load[1]}, 15分钟平均负载${load[2]}`);
    } catch (error) {
      console.error('监控过程中发生错误:', error);
    }
  }

  // 获取当前CPU使用率
  getCurrentCpuUsage() {
    const cpus = os.cpus().length;
    const idle = os.cpus().map(cpu => cpu.times.idle).reduce((acc, val) => acc + val, 0);
    const total = os.cpus().map(cpu => cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq + cpu.times.idle).reduce((acc, val) => acc + val, 0);
    const cpuUsage = 100 - ((idle / total) * 100);
    const diff = cpuUsage - this.lastCpuUsage;
    this.lastCpuUsage = cpuUsage;
    return cpuUsage; // 返回当前CPU使用率
  }

  // 获取内存使用情况
  getMemoryUsage() {
    const free = os.freemem();
    const total = os.totalmem();
    const used = total - free;
    return {
      usedMB: used / (1024 * 1024), // 转换成MB
      freeMB: free / (1024 * 1024), // 转换成MB
      totalMB: total / (1024 * 1024) // 转换成MB
    };
  }

  // 获取系统负载
  getSystemLoad() {
    return os.loadavg(); // 返回系统负载
  }
}

// 使用
const monitor = new SystemPerformanceMonitor(2000); // 每2秒监控一次
monitor.start();