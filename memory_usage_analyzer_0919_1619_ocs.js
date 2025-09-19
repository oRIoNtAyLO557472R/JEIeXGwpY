// 代码生成时间: 2025-09-19 16:19:05
const os = require('os');
const { exec } = require('child_process');

// 函数：获取内存使用情况
function getMemoryUsage() {
    return new Promise((resolve, reject) => {
        exec('free -m', (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(stderr);
            } else {
                const lines = stdout.split(/\r?
/);
                const memoryData = lines[1].trim().split(/\s+/);
                const usedMemory = parseInt(memoryData[2], 10);
                const totalMemory = parseInt(memoryData[1], 10);
                const memoryUsage = (usedMemory / totalMemory * 100).toFixed(2);
                resolve({
                    totalMemory,
                    usedMemory,
                    memoryUsage
                });
            }
        });
    });
}

// 函数：打印内存使用情况
function printMemoryUsage() {
    getMemoryUsage().then(memoryUsage => {
        console.log('Memory Usage Analysis:');
        console.log(`Total Memory: ${memoryUsage.totalMemory} MB`);
        console.log(`Used Memory: ${memoryUsage.usedMemory} MB`);
        console.log(`Memory Usage: ${memoryUsage.memoryUsage}%`);
    }).catch(error => {
        console.error('Error getting memory usage:', error);
    });
}

// 入口点
const main = async () => {
    try {
        printMemoryUsage();
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

main();
