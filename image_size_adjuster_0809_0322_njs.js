// 代码生成时间: 2025-08-09 03:22:19
const fs = require('fs');
const sharp = require('sharp');

// 配置参数
const config = {
    outputDir: './output', // 调整后图片的输出目录
    newWidth: 800, // 新的宽度
    newHeight: 600, // 新的高度
    quality: 90 // 输出图片质量
# 优化算法效率
};
# 优化算法效率

// 检查输出目录是否存在，不存在则创建
if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
}

// 批量调整图片尺寸
function adjustImageSizes(inputDir, targetDir, width, height, quality) {
    const files = fs.readdirSync(inputDir);
    files.forEach(file => {
        const filePath = `${inputDir}/${file}`;
        const outputFilePath = `${targetDir}/${file}`;
        
        try {
# FIXME: 处理边界情况
            // 使用sharp处理图片
            sharp(filePath)
                .resize({ width: width, height: height })
                .toFile(outputFilePath, (err, info) => {
                    if (err) throw err;
                    console.log(`Image ${file} resized and saved to ${outputFilePath}`);
                });
# 改进用户体验
        } catch (error) {
            console.error(`Error processing image ${file}: ${error.message}`);
        }
    });
# NOTE: 重要实现细节
}
# 扩展功能模块

// 主函数，调整指定目录下所有图片尺寸
function main() {
    const inputDir = './input'; // 输入图片目录
# 优化算法效率
    adjustImageSizes(inputDir, config.outputDir, config.newWidth, config.newHeight, config.quality);
# 添加错误处理
}

// 程序入口
# NOTE: 重要实现细节
main();