// 代码生成时间: 2025-09-17 01:05:15
const EventEmitter = require('events');

// ShoppingCart class to handle shopping cart operations.
class ShoppingCart extends EventEmitter {
  
  // ShoppingCart constructor initializes the cart with an empty array.
  constructor() {
    super();
    this.items = [];
  }

  // addItem method to add an item to the cart.
  addItem(item) {
    // Check if the item is valid before adding.
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item added to cart');
    }
    this.items.push(item);
    this.emit('itemAdded', item);
  }

  // removeItem method to remove an item from the cart.
  removeItem(itemId) {
    // Find the index of the item to remove and remove it if found.
    const index = this.items.findIndex(item => item.id === itemId);
    if (index > -1) {
      const removedItem = this.items[index];
      this.items.splice(index, 1);
      this.emit('itemRemoved', removedItem);
    } else {
      throw new Error('Item not found in cart');
    }
  }

  // clearCart method to clear all items in the cart.
  clearCart() {
    this.items = [];
    this.emit('cartCleared');
  }

  // getTotal method to calculate the total price of all items in the cart.
  getTotal() {
    return this.items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  }

  // getItems method to get all items in the cart.
  getItems() {
    return this.items;
  }
}

// Example usage:
const cart = new ShoppingCart();

// Adding items to the cart.
cart.addItem({ id: 1, name: 'Apple', price: 0.99, quantity: 2 });
cart.addItem({ id: 2, name: 'Banana', price: 0.59, quantity: 3 });

// Removing an item from the cart.
try {
  cart.removeItem(1);
} catch (error) {
  console.error(error.message);
}

// Clearing the cart.
cart.clearCart();

// Listening to cart events.
cart.on('itemAdded', item => {
  console.log(`Item added: ${item.name}, Quantity: ${item.quantity}`);
});

cart.on('itemRemoved', item => {
  console.log(`Item removed: ${item.name}, Quantity: ${item.quantity}`);
});

cart.on('cartCleared', () => {
  console.log('Cart cleared.');
});

// Calculate cart total.
const total = cart.getTotal();
console.log(`Total cart value: $${total.toFixed(2)}`);

// Get cart items.
const items = cart.getItems();
console.log('Cart items:', items);
