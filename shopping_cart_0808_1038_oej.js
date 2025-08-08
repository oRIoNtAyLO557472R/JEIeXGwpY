// 代码生成时间: 2025-08-08 10:38:18
const ShoppingCart = (() => {

  // 购物车类
  class ShoppingCart {
    constructor() {
      // 初始化购物车为空数组
      this.items = [];
    }

    // 添加商品到购物车
    addItem(item) {
      if (!item || typeof item !== 'object' || item.id === undefined) {
        throw new Error('Invalid item to be added to the cart');
      }

      // 查找购物车中是否已有该商品
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        // 如果商品已存在，增加数量
        existingItem.quantity += item.quantity;
      } else {
        // 否则，添加新商品到购物车
        this.items.push(item);
      }
    }

    // 从购物车中移除商品
    removeItem(itemId) {
      // 查找要移除的商品
      const index = this.items.findIndex(i => i.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
      } else {
        throw new Error('Item not found in the cart');
      }
    }

    // 获取购物车中的商品列表
    getItems() {
      return this.items;
    }

    // 清空购物车
    clear() {
      this.items = [];
    }
  }

  // 返回购物车类的实例
  return ShoppingCart;
})();

// 使用示例
try {
  const cart = new ShoppingCart();

  // 添加商品
  cart.addItem({ id: 1, name: 'Apple', quantity: 2 });
  cart.addItem({ id: 2, name: 'Banana', quantity: 3 });
  cart.addItem({ id: 1, name: 'Apple', quantity: 1 }); // 增加Apple的数量

  // 获取购物车中的商品列表
  console.log(cart.getItems());

  // 移除商品
  cart.removeItem(2); // 移除Banana
  console.log(cart.getItems());

  // 清空购物车
  cart.clear();
  console.log(cart.getItems());
} catch (error) {
  console.error(error.message);
}