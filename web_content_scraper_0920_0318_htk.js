// 代码生成时间: 2025-09-20 03:18:59
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * 网页内容抓取工具
 * @param {string} url - 需要抓取内容的网页地址
 * @param {Function} callback - 回调函数，用于处理抓取结果
 */
function scrapeWebContent(url, callback) {
  // 错误处理：检查URL是否有效
  if (!url) {
    return callback(new Error('URL cannot be empty'));
  }

  // 使用axios获取网页内容
  axios.get(url)
    .then((response) => {
      // 检查响应状态码是否为200
      if (response.status !== 200) {
        return callback(new Error('Failed to fetch the webpage'));
      }

      // 使用cheerio解析HTML
      const $ = cheerio.load(response.data);
      // 抓取特定的网页内容，例如标题
      const title = $('title').text();

      // 调用回调函数，传入网页标题
      callback(null, title);
    })
    .catch((error) => {
      // 错误处理：捕获请求过程中的异常
      callback(error);
    });
}

// 使用示例
scrapeWebContent('https://example.com', (error, title) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Webpage title:', title);
  }
});