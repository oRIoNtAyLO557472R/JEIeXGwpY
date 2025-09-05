// 代码生成时间: 2025-09-06 01:04:32
const fs = require('fs');
const csvParse = require('csv-parse');
const { Transform } = require('stream');

// 定义一个Transform Stream，用于处理CSV数据
class CSVProcessor extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    // 使用csv-parse解析CSV数据
    const parser = csvParse({
      columns: true,
      skip_empty_lines: true,
    });

    // 错误处理
    parser.on('error', (err) => {
      this.emit('error', err);
    });

    // 处理解析后的数据
    parser.on('data', (data) => {
      // 这里可以添加自定义的处理逻辑
      // 例如：console.log(data);
      this.push(JSON.stringify(data) + '
');
    });

    parser.write(chunk);
    parser.end();
    callback();
  }
}

// 主函数，用于处理指定目录下的所有CSV文件
function processCSVFiles(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach(file => {
      if (file.endsWith('.csv')) {
        const filePath = `${directoryPath}/${file}`;

        // 创建一个可读流
        const readable = fs.createReadStream(filePath);

        // 创建一个可写流，用于输出处理后的数据
        const writable = fs.createWriteStream(`${filePath}.processed`);

        // 将可读流和可写流连接起来
        readable
          .pipe(new CSVProcessor())
          .pipe(writable)
          .on('finish', () => {
            console.log(`Processed file: ${file}`);
          });
      }
    });
  });
}

// 使用示例
const directoryPath = './csv_files';
processCSVFiles(directoryPath);
