// 代码生成时间: 2025-08-23 14:17:57
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

// 创建一个Express应用
const app = express();

// 用于设置视图引擎
app.set('view engine', 'ejs');

// 静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置路由
app.get('/', (req, res) => {
  // 响应式布局的视图
  res.render('index');
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 以下是public目录下的index.ejs文件内容
// 此文件将用于渲染响应式布局的HTML页面
const indexEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Design</title>
  <style>
    /* 基本样式 */
    body {
      font-family: Arial, sans-serif;
    }
    /* 响应式布局样式 */
    .container {
      width: 80%;
      margin: auto;
    }
    @media (max-width: 768px) {
      /* 手机屏幕样式 */
      .container {
        width: 95%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to the Responsive Design Page</h1>
    <p>This is a responsive design layout that adjusts based on the screen size.</p>
  </div>
</body>
</html>
`;

// 将index.ejs的内容写入到public/views/index.ejs
const fs = require('fs');
const viewsPath = path.join(__dirname, 'public', 'views', 'index.ejs');
fs.writeFileSync(viewsPath, indexEjs, 'utf8');