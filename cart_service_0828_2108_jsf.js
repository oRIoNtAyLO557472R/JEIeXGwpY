// 代码生成时间: 2025-08-28 21:08:23
const CartItem = require('./cart_item'); // Assuming CartItem is a module for individual cart items

class CartService {
  
  // Constructor to initialize the cart
  constructor() {
    this.cart = []; // Array to hold cart items
  }

  /**
   * Adds an item to the cart
   * @param {CartItem} item - The item to be added to the cart
   */
  addItem(item) {
    if (!(item instanceof CartItem)) {
      throw new Error('Invalid item: Item must be an instance of CartItem');
    }
    this.cart.push(item);
  }

  /**
   * Removes an item from the cart by its ID
   * @param {number|string} id - The ID of the item to be removed
   */
  removeItem(id) {
    const index = this.cart.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Item not found in cart');
    }
    this.cart.splice(index, 1);
  }

  /**
   * Retrieves the list of items currently in the cart
   * @returns {CartItem[]} - Array of items in the cart
   */
  getItems() {
    return this.cart;
  }

  /**
   * Clears all items from the cart
   */
  clearCart() {
    this.cart = [];
  }
}

module.exports = CartService;