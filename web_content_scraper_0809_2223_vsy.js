// 代码生成时间: 2025-08-09 22:23:17
const puppeteer = require('puppeteer');

// 定义抓取网页内容的函数
async function scrapeWebContent(url) {
  // 确保URL是有效的
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    // 启动Puppeteer浏览器
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    // 创建一个页面
    const page = await browser.newPage();

    // 设置视图大小
    await page.setViewport({ width: 1920, height: 1080 });

    // 访问网页
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 获取网页内容
    const content = await page.content();

    // 关闭浏览器
    await browser.close();

    // 返回网页内容
    return content;
  } catch (error) {
    // 错误处理
    console.error('Failed to scrape web content:', error);
    throw error;
  }
}

// 导出函数，使其可以在其他模块中使用
module.exports = { scrapeWebContent };