// 代码生成时间: 2025-09-13 07:15:15
const express = require('express');
const app = express();

// 用于存放数据的内存数组，实际应用中应使用数据库
const items = [];

// 中间件，用于解析JSON请求体
app.use(express.json());

// 获取所有项目的接口
app.get('/api/items', (req, res) => {
  // 错误处理：如果请求参数无效或缺失
  if (!req.query || !req.query.page || isNaN(req.query.page)) {
    return res.status(400).json({
      error: 'Invalid query parameters'
    });
  }
  // 分页逻辑
  const page = parseInt(req.query.page, 10);
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const itemsPage = items.slice(startIndex, endIndex);
  res.json(itemsPage);
});

// 获取单个项目的接口
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(item => item.id.toString() === id);
  if (!item) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  res.json(item);
});

// 创建新项目的接口
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    ...req.body
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// 更新项目的接口
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  let item = items.find(item => item.id.toString() === id);
  if (!item) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  item = { ...item, ...req.body };
  const index = items.indexOf(item);
  items[index] = item;
  res.json(item);
});

// 删除项目的接口
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(item => item.id.toString() === id);
  if (index === -1) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  items.splice(index, 1);
  res.status(204).send();
});

// 定义服务器端口
const PORT = process.env.PORT || 3000;

// 监听指定端口
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 错误处理中间件，捕获未处理的请求
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});
