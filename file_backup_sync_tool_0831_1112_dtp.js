// 代码生成时间: 2025-08-31 11:12:35
const fs = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');
const { copyFileSync } = require('fs');

/**
 * Checks if a directory exists and creates it if it doesn't
 * @param {string} dirPath - The path to the directory
 */
async function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/**
 * Synchronizes the contents of two directories
 * @param {string} sourceDir - The path to the source directory
 * @param {string} targetDir - The path to the target directory
 */
async function syncDirectories(sourceDir, targetDir) {
  try {
    await ensureDir(targetDir);
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);
      if (entry.isDirectory()) {
        await syncDirectories(sourcePath, targetPath); // Recursive call for directories
      } else {
        await ensureDir(path.dirname(targetPath)); // Ensure the target directory exists
        copyFileSync(sourcePath, targetPath); // Copy file
      }
    }
  } catch (error) {
    console.error('Error during directory synchronization:', error);
  }
}

/**
 * Main function to initiate the backup and sync process
 * @param {string} sourcePath - The path to the source file or directory
 * @param {string} backupPath - The path to the backup directory
 */
async function backupAndSync(sourcePath, backupPath) {
  try {
    await ensureDir(backupPath);
    if (existsSync(sourcePath)) {
      await syncDirectories(sourcePath, backupPath); // Synchronize the directories
      console.log('Backup and sync completed successfully.');
    } else {
      console.error('Source path does not exist.');
    }
  } catch (error) {
    console.error('Backup and sync failed:', error);
  }
}

// Example usage:
// backupAndSync('./source', './backup');

module.exports = {
  backupAndSync,
  syncDirectories,
  ensureDir
};