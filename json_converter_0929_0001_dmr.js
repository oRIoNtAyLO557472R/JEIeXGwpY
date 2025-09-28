// 代码生成时间: 2025-09-29 00:01:10
// 引入Node.js的核心模块
const fs = require('fs');

/**
 * 将输入的JSON字符串转换为指定的格式。
 * 
 * @param {string} inputJson - 输入的JSON字符串。
 * @param {string} formatType - 指定输出的JSON格式类型。
 * @returns {string} 转换后的JSON字符串。
 */
function convertJson(inputJson, formatType) {
    // 尝试解析输入的JSON字符串
    try {
        const parsedJson = JSON.parse(inputJson);
        
        // 根据格式类型返回格式化的JSON字符串
        switch (formatType) {
            case 'pretty':
                return JSON.stringify(parsedJson, null, 4);
            case 'compact':
                return JSON.stringify(parsedJson);
            default:
                throw new Error('Unsupported format type');
        }
    } catch (error) {
        // 处理解析错误
        console.error('Error parsing JSON:', error.message);
        return null;
    }
}

// 主函数，用于处理命令行输入
function main() {
    // 检查命令行参数
    if (process.argv.length < 3) {
        console.error('Usage: node json_converter.js <inputJson> <formatType>');
        process.exit(1);
    }

    const inputJson = process.argv[2];
    const formatType = process.argv[3];

    // 调用转换函数并输出结果
    const result = convertJson(inputJson, formatType);
    if (result !== null) {
        console.log(result);
    }
}

// 程序入口点
main();
