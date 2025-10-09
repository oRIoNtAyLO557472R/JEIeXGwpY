// 代码生成时间: 2025-10-10 02:04:27
const express = require('express');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// 配置文件路径
const configPath = path.join(__dirname, 'config.json');

// 读取配置文件
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// 初始化 Web3 实例
const web3 = new Web3(new Web3.providers.HttpProvider(config.provider));

// 确保区块链网络连接已建立
web3.eth.net.isListening().then((isListening) => {
  if (!isListening) {
    console.error('Blockchain network is not listening');
    process.exit(1);
  }
});

// NFT 智能合约 ABI 和地址
const contractABI = config.contractABI;
const contractAddress = config.contractAddress;

// 初始化 NFT 合约实例
const nftContract = new web3.eth.Contract(contractABI, contractAddress);

// 创建 Express 应用
const app = express();
app.use(express.json()); // 支持 JSON 格式请求体

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 铸造 NFT 的路由
app.post('/mint-nft', async (req, res) => {
  try {
    // 验证请求数据
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
      return res.status(400).send('Missing required fields');
    }

    // 构造 NFT 属性
    const nftData = {
      name: name,
      description: description,
      image: image
    };

    // 调用智能合约的 mint 方法铸造 NFT
    const accounts = await web3.eth.getAccounts();
    const tx = await nftContract.methods.mint(
      nftData.name,
      nftData.description,
      nftData.image
    ).send({ from: accounts[0] });

    // 返回铸造的 NFT 交易哈希
    res.status(201).json({ txHash: tx.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while minting NFT');
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NFT Minting Platform is running on port ${PORT}`);
});

// 代码注释：
// 该程序是一个基于 Node.js 和 Express 框架的 NFT 铸造平台。
// 它通过与区块链上的 NFT 智能合约进行交互来实现 NFT 的铸造功能。
// 程序首先读取配置文件来获取智能合约的 ABI 和地址，
// 然后初始化 Web3 实例和智能合约实例。
// 接着，程序定义了一个 POST 路由来处理 NFT 铸造请求，
// 验证请求数据，构造 NFT 属性，并调用智能合约的 mint 方法来铸造 NFT。
// 最后，程序启动 Express 服务器监听请求。