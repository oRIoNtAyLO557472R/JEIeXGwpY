// 代码生成时间: 2025-08-07 13:48:23
const http = require('http');
const { performance } = require('perf_hooks');

// 函数：生成随机数据字符串
function generateRandomData(size) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < size; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// 函数：发送HTTP请求并测量性能
async function sendHttpRequest(url) {
    return new Promise((resolve, reject) => {
        const start = performance.now();
        http.get(url, (res) => {
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                const end = performance.now();
                console.log(`请求 ${url} 完成，耗时：${end - start} 毫秒`);
                resolve(end - start);
            });
        }).on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
            reject(e);
        });
    });
}

// 主函数：性能测试脚本入口
async function performPerformanceTest() {
    try {
        const url = 'http://example.com'; // 替换为需要测试的URL
        const dataSize = 1024; // 测试数据大小
        const randomData = generateRandomData(dataSize);
        // 发送GET请求
        await sendHttpRequest(url);
        // 可以根据需要添加更多测试，例如POST请求等
    } catch (error) {
        console.error('性能测试失败:', error);
    }
}

// 运行性能测试
performPerformanceTest();