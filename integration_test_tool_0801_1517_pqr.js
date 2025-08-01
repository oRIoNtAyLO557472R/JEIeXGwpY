// 代码生成时间: 2025-08-01 15:17:02
require('dotenv').config();

// 引入依赖
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const config = {
  testScriptPath: process.env.TEST_SCRIPT_PATH,
  reportPath: process.env.REPORT_PATH
};

// 执行测试脚本并生成报告
function runIntegrationTests() {
  // 检查测试脚本路径是否存在
  if (!fs.existsSync(config.testScriptPath)) {
    throw new Error('Test script path does not exist.');
  }

  // 执行测试脚本
  exec(`node ${config.testScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);

    // 保存报告
    const outputPath = path.join(config.reportPath, 'integration_test_report.html');
    fs.writeFile(outputPath, stdout, 'utf8', (err) => {
      if (err) {
        throw new Error('Failed to write report file.');
      }
      console.log(`Report saved to ${outputPath}`);
    });
  });
}

// 确保报告路径存在
function ensureReportPathExists() {
  if (!fs.existsSync(config.reportPath)) {
    fs.mkdirSync(config.reportPath, { recursive: true });
  }
}

// 主函数
function main() {
  try {
    ensureReportPathExists();
    runIntegrationTests();
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// 程序入口点
main();