// 代码生成时间: 2025-09-13 12:02:47
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// 库存管理系统
class InventoryManagement {
  // 构造函数，初始化库存文件路径
  constructor(filePath) {
    this.filePath = filePath;
  }

  // 读取库存数据
  async readInventory() {
    try {
      const data = await readFileAsync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading inventory:', error);
      throw error;
    }
  }

  // 添加库存项
  async addInventoryItem(item) {
    try {
      const inventoryData = await this.readInventory();
      inventoryData[item.id] = item;
      await this.writeInventory(inventoryData);
    } catch (error) {
      console.error('Error adding inventory item:', error);
      throw error;
    }
  }

  // 更新库存项
  async updateInventoryItem(id, newItem) {
    try {
      const inventoryData = await this.readInventory();
      if (inventoryData[id]) {
        inventoryData[id] = newItem;
        await this.writeInventory(inventoryData);
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      console.error('Error updating inventory item:', error);
      throw error;
    }
  }

  // 删除库存项
  async deleteInventoryItem(id) {
    try {
      const inventoryData = await this.readInventory();
      if (inventoryData[id]) {
        delete inventoryData[id];
        await this.writeInventory(inventoryData);
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      throw error;
    }
  }

  // 私有方法，写入库存数据
  async writeInventory(data) {
    try {
      const dataJson = JSON.stringify(data, null, 2);
      await writeFileAsync(this.filePath, dataJson, 'utf8');
    } catch (error) {
      console.error('Error writing inventory:', error);
      throw error;
    }
  }
}

// 使用示例
(async () => {
  const inventory = new InventoryManagement('./inventory.json');
  try {
    const inventoryData = await inventory.readInventory();
    console.log('Current Inventory:', inventoryData);

    await inventory.addInventoryItem({
      id: '001',
      name: 'Product A',
      quantity: 10
    });

    await inventory.updateInventoryItem('001', {
      name: 'Product A',
      quantity: 15
    });

    await inventory.deleteInventoryItem('002'); // 尝试删除不存在的项
  } catch (error) {
    console.error('Error:', error);
  }
})();