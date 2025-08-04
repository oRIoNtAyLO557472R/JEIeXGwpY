// 代码生成时间: 2025-08-05 00:44:42
const http = require('http');

/**
 * 检查网络连接状态的函数
 * @param {string} host - 要检查连接的主机地址
 * @param {number} port - 要检查连接的端口号
 * @param {number} timeout - 超时时间（毫秒）
 */
function checkNetworkConnection(host, port, timeout) {
  // 设置超时时间
  const timeoutDuration = timeout || 5000;
  
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: host,
      port: port,
      timeout: timeoutDuration
    }, (res) => {
      // 如果服务器响应，则连接成功
      resolve(`Connection successful! Status code: ${res.statusCode}`);
    });

    // 监听错误事件
    req.on("error", (err) => {
      // 如果请求失败，则连接失败
      reject(`Connection failed: ${err.message}`);
    });

    // 设置请求超时
    req.setTimeout(timeoutDuration, () => {
      req.abort(); // 终止请求
      reject("Connection timed out"); // 拒绝Promise，表示连接超时
    });

    // 发送请求
    req.end();
  });
}

// 使用示例
const host = 'www.google.com';
const port = 80;
checkNetworkConnection(host, port)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });