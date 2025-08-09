// 代码生成时间: 2025-08-10 06:12:38
const http = require('http');
const https = require('https');
const { JSDOM } = require('jsdom');

/**
 * 网页内容抓取工具
 * @param {string} url - 需要抓取的网页URL
 * @param {Function} callback - 处理抓取结果的回调函数
 */
function scrapeWebContent(url, callback) {
  // 确定是http还是https请求
  const client = url.startsWith('https') ? https : http;

  client.get(url, (response) => {
    if (response.statusCode === 200) {
      // 读取响应数据
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        // 使用JSDOM解析HTML内容
        JSDOM.fromString(data, {
          resources: 'usable',
          beforeParse(window) {
            window.document.documentElement.innerHTML += '
<!-- This is a placeholder -->';
          }
        }).then((dom) => {
          const document = dom.window.document;
          // 调用回调函数，传入解析后的文档对象
          callback(null, document);
        }).catch((error) => {
          // 处理解析错误
          callback(error, null);
        });
      });
    } else {
      // 处理非200状态码
      callback(new Error(`Failed to fetch content from ${url}. Status Code: ${response.statusCode}`), null);
    }
  }).on('error', (error) => {
    // 处理请求错误
    callback(error, null);
  });
}

// 示例：抓取指定网页的内容
scrapeWebContent('http://example.com', (error, document) => {
  if (error) {
    console.error('An error occurred:', error.message);
  } else {
    console.log('Successfully fetched content:', document.documentElement.outerHTML);
  }
});

module.exports = { scrapeWebContent };