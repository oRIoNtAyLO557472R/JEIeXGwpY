// 代码生成时间: 2025-09-19 22:58:35
const ExcelJS = require('exceljs');

/**
 * Excel表格自动生成器
 * @class ExcelGenerator
 */
class ExcelGenerator {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
    this.sheet = this.workbook.addWorksheet('My Sheet');
  }

  /**
   * 添加一行数据到Excel表格
   * @param {Array} rowData - 一行数据数组
   */
  addRow(rowData) {
    if (!Array.isArray(rowData)) {
      throw new Error('rowData must be an array.');
    }
    this.sheet.addRow(rowData);
  }

  /**
   * 添加多行数据到Excel表格
   * @param {Array} rowsData - 多行数据数组
   */
  addRows(rowsData) {
    if (!Array.isArray(rowsData)) {
      throw new Error('rowsData must be an array of arrays.');
    }
    rowsData.forEach(rowData => this.addRow(rowData));
  }

  /**
   * 保存Excel文件
   * @param {String} filename - 文件名
   */
  save(filename) {
    if (typeof filename !== 'string') {
      throw new Error('filename must be a string.');
    }
    return this.workbook.xlsx.writeFile(filename)
      .then(() => {
        console.log(`Excel file saved as ${filename}`);
      })
      .catch(error => {
        console.error('Failed to save Excel file:', error);
      });
  }
}

// 使用示例
const excelGenerator = new ExcelGenerator();

// 添加一行数据
excelGenerator.addRow(['Name', 'Age', 'City']);

// 添加多行数据
excelGenerator.addRows([['Alice', 28, 'New York'], ['Bob', 22, 'Los Angeles']]);

// 保存Excel文件
excelGenerator.save('example.xlsx');