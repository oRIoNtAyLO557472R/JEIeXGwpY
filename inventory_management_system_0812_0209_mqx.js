// 代码生成时间: 2025-08-12 02:09:16
// Require the necessary Node.js modules
const fs = require('fs');
const path = require('path');

// Define the inventory file path
const inventoryFilePath = path.join(__dirname, 'inventory.json');

// Helper function to load the inventory from the file system
function loadInventory() {
    try {
        const data = fs.readFileSync(inventoryFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If the file does not exist or is empty, return an empty inventory
        return {};
    }
}

// Helper function to save the inventory to the file system
function saveInventory(inventory) {
    const data = JSON.stringify(inventory, null, 2);
    fs.writeFileSync(inventoryFilePath, data, 'utf8');
}

// Function to add a new item to the inventory
function addItem(itemName, quantity) {
    const inventory = loadInventory();
    if (inventory[itemName]) {
        inventory[itemName] += quantity;
    } else {
        inventory[itemName] = quantity;
    }
    saveInventory(inventory);
}

// Function to remove an item from the inventory
function removeItem(itemName, quantity) {
    const inventory = loadInventory();
    if (inventory[itemName] && inventory[itemName] >= quantity) {
        inventory[itemName] -= quantity;
        if (inventory[itemName] === 0) {
            delete inventory[itemName];
        }
        saveInventory(inventory);
    } else {
        console.error('Error: Insufficient quantity or item does not exist.');
    }
}

// Function to check the inventory stock
function checkStock(itemName) {
    const inventory = loadInventory();
    const stock = inventory[itemName] || 0;
    console.log(`Stock for ${itemName}: ${stock}`);
    return stock;
}

// Example usage of the inventory management system
addItem('Widget', 10); // Adds 10 widgets to the inventory
removeItem('Widget', 2); // Removes 2 widgets from the inventory
checkStock('Widget'); // Checks the stock of widgets

module.exports = {
    addItem,
    removeItem,
    checkStock
};