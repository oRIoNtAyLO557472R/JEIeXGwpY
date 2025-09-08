// 代码生成时间: 2025-09-08 11:34:07
const os = require('os');
const { performance } = require('perf_hooks');

// SystemPerformanceMonitor class to monitor system performance
class SystemPerformanceMonitor {
    // Constructor
    constructor() {
        this.lastCpuUsage = 0;
    }

    // Method to get CPU usage
    getCpuUsage() {
        return new Promise((resolve, reject) => {
            // Get CPU usage for the current process
            const cpuUsage = process.cpuUsage();
            resolve({
                user: cpuUsage.user,
                system: cpuUsage.system,
                last: this.lastCpuUsage,
            });
            this.lastCpuUsage = cpuUsage.user + cpuUsage.system;
        });
    }

    // Method to get memory usage
    getMemoryUsage() {
        const memoryUsage = process.memoryUsage();
        return {
            rss: memoryUsage.rss, // Resident Set Size
            heapTotal: memoryUsage.heapTotal,
            heapUsed: memoryUsage.heapUsed,
            external: memoryUsage.external,
        };
    }

    // Method to get system uptime
    getSystemUptime() {
        return os.uptime();
    }

    // Method to get system load averages
    getSystemLoadAverages() {
        return os.loadavg();
    }
}

// Example usage of SystemPerformanceMonitor
(async () => {
    try {
        const monitor = new SystemPerformanceMonitor();

        console.log('CPU Usage:', await monitor.getCpuUsage());
        console.log('Memory Usage:', monitor.getMemoryUsage());
        console.log('System Uptime:', monitor.getSystemUptime() + ' seconds');
        console.log('System Load Averages:', monitor.getSystemLoadAverages());

        // Simulate periodic monitoring
        setInterval(async () => {
            try {
                console.log('Current CPU Usage:', await monitor.getCpuUsage());
            } catch (error) {
                console.error('Error monitoring CPU usage:', error);
            }
        }, 1000);
    } catch (error) {
        console.error('Error initializing system performance monitor:', error);
    }
})();