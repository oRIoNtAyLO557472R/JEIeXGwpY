// 代码生成时间: 2025-08-07 22:22:53
const http = require('http');
const { performance } = require('perf_hooks');

// 性能测试函数
function performanceTest(url, options, numberOfRequests) {
  // 记录开始时间
  const start = performance.now();
  let completedRequests = 0;
  let errorCount = 0;

  // 执行指定数量的请求
  for (let i = 0; i < numberOfRequests; i++) {
    const client = http.request(url, options, (response) => {
      // 计算并打印每个请求的处理时间
      const elapsedTime = performance.now() - start;
      console.log(`Request ${i + 1}: ${response.statusCode} - ${elapsedTime} ms`);

      // 检查响应状态码
      if (response.statusCode !== 200) {
        console.error(`Request ${i + 1} failed with status code: ${response.statusCode}`);
        errorCount++;
      }

      // 增加完成的请求数
      completedRequests++;
      // 如果所有请求都已完成，计算平均响应时间并打印结果
      if (completedRequests === numberOfRequests) {
        const averageTime = (performance.now() - start) / completedRequests;
        const successRate = ((numberOfRequests - errorCount) / numberOfRequests) * 100;
        console.log(`Completed ${numberOfRequests} requests with ${errorCount} errors`);
        console.log(`Average response time: ${averageTime.toFixed(2)} ms`);
        console.log(`Success rate: ${successRate.toFixed(2)}%`);
      }
    });
    client.on('error', (e) => {
      // 错误处理
      console.error(`Request ${i + 1} failed with error: ${e.message}`);
      errorCount++;
    });
    client.end();
  }
}

// 使用示例
const options = {
  hostname: 'example.com',
  port: 80,
  path: '/',
  method: 'GET',
};

// 测试100次GET请求
performanceTest(options, 100);