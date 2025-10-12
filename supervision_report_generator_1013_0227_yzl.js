// 代码生成时间: 2025-10-13 02:27:23
const fs = require('fs');
const path = require('path');
const { createReport } = require('./report_creator'); // 假设有一个模块负责报告生成

/**
 * 生成监管报告的主函数
 * @param {string} reportType - 报告类型
 * @param {string} dataPath - 数据文件路径
 * @param {string} outputPath - 输出文件路径
 * @returns {Promise<void>}
 */
async function generateSupervisionReport(reportType, dataPath, outputPath) {
  if (!reportType) {
    throw new Error('Report type is required.');
  }
  if (!dataPath) {
    throw new Error('Data path is required.');
  }
  if (!outputPath) {
    throw new Error('Output path is required.');
  }
  
  // 检查数据文件是否存在
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Data file not found at path: ${dataPath}`);
  }
  
  // 调用报告生成函数
  try {
    const report = await createReport(reportType, dataPath);
    
    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 将报告写入文件
    fs.writeFileSync(outputPath, report);
    console.log(`Report generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate report:', error.message);
    throw error;
  }
}

/**
 * 启动报告生成程序
 * @param {string[]} args - 命令行参数
 */
function startGenerator(args) {
  if (args.length < 4) {
    console.error('Usage: node supervision_report_generator.js <reportType> <dataPath> <outputPath>');
    process.exit(1);
  }
  
  const reportType = args[2];
  const dataPath = args[3];
  const outputPath = args[4];
  
  generateSupervisionReport(reportType, dataPath, outputPath)
    .then(() => console.log('Report generation completed.'))
    .catch(error => console.error('Error in report generation:', error));
}

// 如果直接运行该脚本，则启动报告生成程序
if (require.main === module) {
  startGenerator(process.argv);
}

// 导出函数以供其他模块使用
module.exports = { generateSupervisionReport };
