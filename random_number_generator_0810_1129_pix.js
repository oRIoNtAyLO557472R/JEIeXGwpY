// 代码生成时间: 2025-08-10 11:29:00
const getRandomNumber = (min, max) => {
  // 检查参数是否为数字类型
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both arguments must be numbers.');
  }

  // 检查最小值和最大值是否合理
  if (min > max) {
    throw new Error('Min value cannot be greater than max value.');
  }

  // 生成随机数
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 测试函数
try {
  console.log('Random number between 1 and 10:', getRandomNumber(1, 10));
} catch (error) {
  console.error(error.message);
}