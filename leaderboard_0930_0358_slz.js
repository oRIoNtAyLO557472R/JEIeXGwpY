// 代码生成时间: 2025-09-30 03:58:22
const Leaderboard = require('./leaderboard');

// 排行榜服务
class LeaderboardService {
  // 构造函数
  constructor() {
    this.leaderboard = new Leaderboard();
  }

  // 添加分数到排行榜
  addScore(userId, score) {
    if (!userId || typeof userId !== 'string' || !score || typeof score !== 'number') {
      throw new Error('Invalid user ID or score');
    }
    return this.leaderboard.add({
      id: userId,
      score: score
    });
  }

  // 获取排行榜
  getLeaderboard(limit = 10) {
    if (typeof limit !== 'number') {
      throw new Error('Limit must be a number');
    }
    return this.leaderboard.getTopScores(limit);
  }
}

// 使用示例
const leaderboardService = new LeaderboardService();

// 添加分数到排行榜
leaderboardService.addScore('user123', 1500)
  .then(() => console.log('Score added successfully'))
  .catch((error) => console.error('Error adding score:', error));

// 获取排行榜前10名
leaderboardService.getLeaderboard(10)
  .then((topScores) => console.log('Top scores:', topScores))
  .catch((error) => console.error('Error retrieving top scores:', error));

// Leaderboard类实现
class Leaderboard {
  constructor() {
    this.scores = [];
  }

  // 添加分数到排行榜
  add({ id, score }) {
    // 在这里可以添加数据库逻辑，例如插入或更新分数
    // 这里我们只是简单地将分数添加到数组中
    this.scores.push({ id, score });
    this.scores.sort((a, b) => b.score - a.score);
    return Promise.resolve();
  }

  // 获取排行榜
  getTopScores(limit) {
    // 在这里可以添加数据库逻辑，例如查询分数
    // 这里我们只是简单地返回分数数组的前limit个元素
    return Promise.resolve(this.scores.slice(0, limit));
  }
}

module.exports = Leaderboard;