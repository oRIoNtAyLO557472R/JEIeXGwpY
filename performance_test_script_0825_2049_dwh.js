// 代码生成时间: 2025-08-25 20:49:39
 * Features:
 * - Makes HTTP requests to a specified URL for a given number of times.
 * - Measures the response time for each request.
 * - Calculates average response time and other statistics.
 *
 * Usage:
 * node performance_test_script.js <URL> <Number of requests>
 */

const http = require('http');

// Function to send a single HTTP request and log the response time
function sendRequest(url, callback) {
  const start = process.hrtime.bigint(); // High-resolution timer
  http.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const end = process.hrtime.bigint();
      const responseTime = Number(end - start) / 1000000; // Convert to milliseconds
      callback(responseTime);
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

// Function to perform performance testing
function performPerformanceTest(url, numberOfRequests) {
  let responseTimes = [];
  let completedRequests = 0;

  const handleResponse = (responseTime) => {
    responseTimes.push(responseTime);
    completedRequests++;
    if (completedRequests === numberOfRequests) {
      calculateStatistics(responseTimes);
    }
  };

  for (let i = 0; i < numberOfRequests; i++) {
    sendRequest(url, handleResponse);
  }
}

// Function to calculate statistics from response times
function calculateStatistics(responseTimes) {
  const sum = responseTimes.reduce((acc, time) => acc + time, 0);
  const average = sum / responseTimes.length;
  const max = Math.max(...responseTimes);
  const min = Math.min(...responseTimes);

  console.log(`Average response time: ${average} ms`);
  console.log(`Minimum response time: ${min} ms`);
  console.log(`Maximum response time: ${max} ms`);
}

// Main function to run the performance test
function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error('Usage: node performance_test_script.js <URL> <Number of requests>');
    process.exit(1);
  }

  const [url, numberOfRequests] = args;
  const requests = parseInt(numberOfRequests, 10);
  if (isNaN(requests)) {
    console.error('The number of requests must be a valid integer.');
    process.exit(1);
  }

  performPerformanceTest(url, requests);
}

main();