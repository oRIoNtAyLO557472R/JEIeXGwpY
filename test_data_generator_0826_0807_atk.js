// 代码生成时间: 2025-08-26 08:07:35
const fs = require('fs');
const path = require('path');

// 测试数据生成器类
class TestDataGenerator {
  // 构造函数
  constructor(outputPath) {
    this.outputPath = outputPath;
  }

  // 生成测试数据
  generateData(data, filename) {
    // 检查输出路径是否存在，如果不存在则创建
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }

    try {
      // 将测试数据写入文件
      fs.writeFileSync(path.join(this.outputPath, filename), JSON.stringify(data, null, 2));
      console.log(`Test data generated successfully in ${filename}`);
    } catch (error) {
      // 错误处理
      console.error('Failed to generate test data:', error);
    }
  }
}

// 示例用法
const main = () => {
  // 测试数据
  const testData = {
    user1: { id: 1, name: 'John Doe' },
    user2: { id: 2, name: 'Jane Doe' },
  };

  // 实例化测试数据生成器
  const generator = new TestDataGenerator('./test-data');

  // 生成测试数据文件
  generator.generateData(testData, 'users.json');
};

// 运行主函数
main();