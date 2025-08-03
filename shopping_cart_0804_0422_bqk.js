// 代码生成时间: 2025-08-04 04:22:52
const EventEmitter = require('events');

// 购物车类
class ShoppingCart extends EventEmitter {
  constructor() {
# NOTE: 重要实现细节
    super();
    this.items = []; // 存储购物车中的商品
  }

  // 添加商品到购物车
  addItem(item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item');
    }
    const existingItem = this.items.find(i => i.id === item.id);
# 改进用户体验
    if (existingItem) {
      existingItem.quantity++;
    } else {
# TODO: 优化性能
      this.items.push({ ...item, quantity: 1 });
    }
    this.emit('itemAdded', item);
  }

  // 从购物车移除商品
# 增强安全性
  removeItem(itemId) {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error('Item not found');
    }
    if (this.items[index].quantity === 1) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity--;
    }
    this.emit('itemRemoved', { id: itemId, quantity: this.items[index] ? this.items[index].quantity : 0 });
  }
# TODO: 优化性能

  // 获取购物车中的商品列表
  getItems() {
# NOTE: 重要实现细节
    return this.items;
  }

  // 计算购物车总金额
  totalAmount() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

// 示例用法
const cart = new ShoppingCart();

cart.on('itemAdded', item => {
  console.log(`Item ${item.name} added to cart. Total items: ${cart.items.length}`);
});

cart.on('itemRemoved', item => {
  console.log(`Item with id ${item.id} removed from cart. Remaining quantity: ${item.quantity}`);
});

try {
  cart.addItem({ id: 1, name: 'Apple', price: 0.99, quantity: 1 });
  cart.addItem({ id: 2, name: 'Banana', price: 0.59, quantity: 1 });
  cart.addItem({ id: 1, name: 'Apple', price: 0.99, quantity: 1 }); // 应该更新Apple的数量
  console.log('Total amount:', cart.totalAmount()); // 应该输出总金额
  cart.removeItem(2);
  console.log('Total amount after removal:', cart.totalAmount()); // 应该输出移除Banana后的总金额
} catch (error) {
# FIXME: 处理边界情况
  console.error(error.message);
}
