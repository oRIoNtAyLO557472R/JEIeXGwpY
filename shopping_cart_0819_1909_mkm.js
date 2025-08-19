// 代码生成时间: 2025-08-19 19:09:25
const EventEmitter = require('events');

// 定义一个购物车类，继承自EventEmitter
class ShoppingCart extends EventEmitter {
  constructor() {
    super();
    // 购物车中的商品，以商品ID为键，数量为值
    this.items = {};
  }

  // 添加商品到购物车
  addItem(sku, quantity) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    if (this.items[sku]) {
      // 如果商品已经在购物车中，增加其数量
      this.items[sku] += quantity;
    } else {
      // 如果商品不在购物车中，添加它并设置数量
      this.items[sku] = quantity;
    }
    // 触发'itemAdded'事件
    this.emit('itemAdded', sku, quantity);
  }

  // 从购物车中移除商品
  removeItem(sku, quantity) {
    if (!this.items[sku]) {
      throw new Error('Item not found in cart');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    if (this.items[sku] <= quantity) {
      // 如果移除的数量大于等于商品数量，从购物车中完全移除该商品
      delete this.items[sku];
    } else {
      // 否则，减少商品数量
      this.items[sku] -= quantity;
    }
    // 触发'itemRemoved'事件
    this.emit('itemRemoved', sku, quantity);
  }

  // 获取购物车中所有商品的总数量
  getTotalItems() {
    return Object.values(this.items).reduce((sum, quantity) => sum + quantity, 0);
  }

  // 清空购物车
  clearCart() {
    this.items = {};
    // 触发'cartCleared'事件
    this.emit('cartCleared');
  }
}

// 使用示例
const cart = new ShoppingCart();

// 添加商品事件监听器
cart.on('itemAdded', (sku, quantity) => {
  console.log(`Item ${sku} added. Quantity: ${quantity}`);
});

// 移除商品事件监听器
cart.on('itemRemoved', (sku, quantity) => {
  console.log(`Item ${sku} removed. Quantity: ${quantity}`);
});

// 清空购物车事件监听器
cart.on('cartCleared', () => {
  console.log('Cart cleared');
});

try {
  // 添加商品到购物车
  cart.addItem('123', 2);
  // 移除商品从购物车
  cart.removeItem('123', 1);
  // 获取购物车商品总数量
  console.log(`Total items in cart: ${cart.getTotalItems()}`);
  // 清空购物车
  cart.clearCart();
} catch (error) {
  console.error(error.message);
}