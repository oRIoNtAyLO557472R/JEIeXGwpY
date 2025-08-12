// 代码生成时间: 2025-08-12 10:45:38
const crypto = require('crypto');

/**
 * 哈希值计算工具
 * @class HashCalculator
 */
class HashCalculator {
  /**
   * 计算字符串的哈希值
   * @param {string} algorithm - 哈希算法（例如 'md5', 'sha256'）
   * @param {string} input - 需要计算哈希值的字符串
   * @returns {Promise<string>} 计算得到的哈希值字符串
   */
  static async calculateHash(algorithm, input) {
    // 检查算法是否支持
    if (!crypto.getHashes().includes(algorithm)) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }

    // 创建哈希实例
    const hash = crypto.createHash(algorithm);

    // 更新哈希实例的数据
    hash.update(input);

    // 计算哈希值
    return hash.digest('hex');
  }
}

// 导出类
module.exports = HashCalculator;

// 使用示例
(async () => {
  try {
    const hashValue = await HashCalculator.calculateHash('sha256', 'Hello, World!');
    console.log(hashValue); // 输出哈希值
  } catch (error) {
    console.error('Error calculating hash:', error.message);
  }
})();