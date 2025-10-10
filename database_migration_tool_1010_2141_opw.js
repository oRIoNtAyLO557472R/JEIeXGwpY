// 代码生成时间: 2025-10-10 21:41:55
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
// 使用pg模块连接PostgreSQL数据库

// 配置数据库客户端
const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// 函数：读取迁移文件
async function readMigrationFiles(directory) {
  const files = await fs.promises.readdir(directory);
  return files.filter(file => file.endsWith('.sql')).sort();
}

// 函数：执行SQL文件
async function executeSqlFile(client, filePath) {
  const sql = await fs.promises.readFile(filePath, 'utf8');
  try {
    await client.query(sql);
    console.log(`Migration file executed: ${filePath}`);
  } catch (error) {
    console.error(`Error executing migration file: ${filePath}`, error);
    throw error;
  }
}

// 函数：应用迁移
async function applyMigrations(directory) {
  try {
    await client.connect();
    const migrationFiles = await readMigrationFiles(directory);
    for (const file of migrationFiles) {
      const filePath = path.join(directory, file);
      await executeSqlFile(client, filePath);
    }
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
  }
}

// 主函数：执行迁移
async function runMigration() {
  const migrationsDirectory = path.join(__dirname, 'migrations');
  try {
    await applyMigrations(migrationsDirectory);
    console.log('All migrations applied successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// 运行迁移工具
runMigration();

// 注意：
// - 请确保你的 PostgreSQL 用户名、密码、数据库名称和端口号正确。
// - 将迁移SQL文件放在与此脚本同一目录下的'migrations'文件夹中。
// - 这个脚本假设每个迁移文件都是顺序命名的，例如001_init.sql, 002_add_table.sql。
