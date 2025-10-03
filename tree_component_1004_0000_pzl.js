// 代码生成时间: 2025-10-04 00:00:20
const TreeNode = require('./TreeNode');

// TreeComponent class represents a tree structure component
class TreeComponent {
  // Constructor initializes the root node of the tree
  constructor() {
    this.root = null;
  }

  // Sets the root node of the tree
  setRootNode(nodeData) {
    this.root = new TreeNode(nodeData);
  }

  // Adds a child node to a parent node
  addChildNode(parentNodeData, childNodeData) {
    if (!this.root || !this.root.data === parentNodeData) {
      throw new Error('Parent node not found');
    }

    let parentNode = this.findNode(this.root, parentNodeData);
    if (!parentNode) {
      throw new Error('Parent node not found');
    }

    let childNode = new TreeNode(childNodeData);
    parentNode.children.push(childNode);
  }

  // Finds a node with the specified data in the tree
  findNode(node, data) {
    if (node.data === data) {
      return node;
    }

    for (let child of node.children) {
      let foundNode = this.findNode(child, data);
      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  }

  // Prints the tree in a readable format
  printTree() {
    this.printNode(this.root, 0);
  }

  // Helper function to print a node and its children
  printNode(node, level) {
    if (!node) return;

    let prefix = '  '.repeat(level);
    console.log(prefix + node.data);

    for (let child of node.children) {
      this.printNode(child, level + 1);
    }
  }
}

// TreeNode class represents a single node in the tree
class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
}

// Example usage
const tree = new TreeComponent();
tree.setRootNode('Root');
tree.addChildNode('Root', 'Child 1');
tree.addChildNode('Root', 'Child 2');
tree.addChildNode('Child 1', 'Grandchild 1');
tree.printTree();