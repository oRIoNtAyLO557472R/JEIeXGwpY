// 代码生成时间: 2025-10-13 18:25:04
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

// 使用cookie-parser中间件来解析cookie
app.use(cookieParser());

// 模拟用户数据
const users = {
  'user1': {
    id: 'user1',
    name: 'John Doe',
    password: 'password123'
  }
};

// 登录接口
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // 查找用户
  const user = users[username];
  
  if (user && user.password === password) {
    // 设置cookie
    res.cookie('session', username, { httpOnly: true });
    res.send('Logged in successfully');
  } else {
    res.status(401).send('Authentication failed');
  }
});

// 登出接口
app.get('/logout', (req, res) => {
  // 清除cookie
  res.clearCookie('session');
  res.send('Logged out successfully');
});

// 受保护的资源接口
app.get('/protected', (req, res) => {
  const session = req.cookies.session;
  
  if (session && users[session]) {
    res.send(`Welcome back, ${users[session].name}! This is a protected resource.`);
  } else {
    res.status(401).send('You are not authorized to access this resource.');
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 文档注释
/**
 * Express.js server setup for a simple Single Sign-On (SSO) system.
 * This server handles login, logout, and protected resource access.
 *
 * @author Your Name
 * @version 1.0
 */