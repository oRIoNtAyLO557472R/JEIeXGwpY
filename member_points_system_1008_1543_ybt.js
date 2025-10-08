// 代码生成时间: 2025-10-08 15:43:48
const EventEmitter = require('events');

// 定义会员积分事件
const MemberPointsEvent = new EventEmitter();

// 会员积分系统类
class MemberPointsSystem {
  constructor() {
    this.members = []; // 存储会员信息
    this.pointsThresholds = { 100: 'Bronze', 500: 'Silver', 1000: 'Gold' }; // 积分阈值和对应的会员等级
  }

  // 添加会员
  addMember(memberId, points = 0) {
    if (this.members.find(m => m.id === memberId)) {
      throw new Error("Member already exists");
    }
    this.members.push({ id: memberId, points: points });
    this.updateMember(memberId);
    console.log(`Member ${memberId} added with ${points} points`);
  }

  // 更新会员积分
  updatePoints(memberId, additionalPoints) {
    const member = this.findMember(memberId);
    if (!member) {
      throw new Error("Member not found");
    }
    member.points += additionalPoints;
    this.updateMember(memberId);
    console.log(`Member ${memberId} updated, new points: ${member.points}`);
  }

  // 查找会员
  findMember(memberId) {
    return this.members.find(m => m.id === memberId);
  }

  // 更新会员等级
  updateMember(memberId) {
    const member = this.findMember(memberId);
    if (!member) return;
    const points = member.points;
    for (const [threshold, level] of Object.entries(this.pointsThresholds)) {
      if (points >= threshold) {
        member.level = level;
        break;
      }
    }
  }

  // 监听会员积分变化
  onPointsChange(memberId, callback) {
    MemberPointsEvent.on(memberId, callback);
  }

  // 触发会员积分变化
  triggerPointsChange(memberId) {
    MemberPointsEvent.emit(memberId, this.findMember(memberId));
  }
}

// 使用示例
const pointsSystem = new MemberPointsSystem();

// 添加会员并监听积分变化
pointsSystem.onPointsChange('member1', (member) => {
  console.log(`Member ${member.id} has been updated to level ${member.level} with ${member.points} points`);
});

// 添加会员
pointsSystem.addMember('member1', 200);

// 更新会员积分
pointsSystem.updatePoints('member1', 300);
