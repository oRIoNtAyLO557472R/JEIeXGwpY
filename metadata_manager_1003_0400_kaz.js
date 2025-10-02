// 代码生成时间: 2025-10-03 04:00:21
const fs = require('fs');
const path = require('path');

// MetadataManager类负责管理元数据
class MetadataManager {
    // 构造函数接收文件存储路径
    constructor(storagePath) {
        this.storagePath = storagePath;
    }

    // 加载元数据
    async loadMetadata() {
        try {
            const metadataPath = path.join(this.storagePath, 'metadata.json');
            const data = await fs.promises.readFile(metadataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading metadata:', error);
            throw new Error('Failed to load metadata');
        }
    }

    // 保存元数据
    async saveMetadata(metadata) {
        try {
            const metadataPath = path.join(this.storagePath, 'metadata.json');
            await fs.promises.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
        } catch (error) {
            console.error('Error saving metadata:', error);
            throw new Error('Failed to save metadata');
        }
    }

    // 添加或更新元数据条目
    async updateMetadataEntry(key, value) {
        const metadata = await this.loadMetadata();
        metadata[key] = value;
        await this.saveMetadata(metadata);
    }

    // 删除元数据条目
    async deleteMetadataEntry(key) {
        const metadata = await this.loadMetadata();
        delete metadata[key];
        await this.saveMetadata(metadata);
    }
}

// 使用示例
(async () => {
    const storagePath = './metadata_storage';
    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
    }
    const metadataManager = new MetadataManager(storagePath);

    try {
        await metadataManager.updateMetadataEntry('exampleKey', 'exampleValue');
        const metadata = await metadataManager.loadMetadata();
        console.log('Loaded metadata:', metadata);
        await metadataManager.deleteMetadataEntry('exampleKey');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();