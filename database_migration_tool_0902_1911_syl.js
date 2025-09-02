// 代码生成时间: 2025-09-02 19:11:20
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// 数据库配置
const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
};

// 创建数据库连接池
const pool = new Pool(dbConfig);

// 数据库迁移文件路径
const migrationDir = path.join(__dirname, 'migrations');

// 获取所有迁移文件
function getMigrationFiles() {
  return fs.readdirSync(migrationDir).filter(file => file.endsWith('.sql'));
}

// 执行迁移文件
function runMigration(file) {
  const filePath = path.join(migrationDir, file);
  const sql = fs.readFileSync(filePath, 'utf8');

  return pool.query(sql).catch(err => {
    console.error(`Error running migration ${file}:`, err);
    throw err;
  });
}

// 执行所有迁移
function runMigrations() {
  const migrationFiles = getMigrationFiles();
  console.log(`Running ${migrationFiles.length} migrations...`);

  migrationFiles.forEach(file => {
    runMigration(file).then(() => {
      console.log(`Migration ${file} completed successfully`);
    }).catch(err => {
      console.error(`Failed to run migration ${file}:`, err);
    });
  });
}

// 主函数，执行迁移
function migrate() {
  try {
    runMigrations();
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

// 导出迁移函数
module.exports = {
  migrate
};