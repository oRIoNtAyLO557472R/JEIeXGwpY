// 代码生成时间: 2025-09-15 18:56:49
 * Provides endpoints for creating, reading, updating, and deleting items.
 */

// Import required modules
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for items
let items = [];

// POST endpoint to create a new item
app.post('/items', (req, res) => {
    try {
        // Check if the request body has the necessary properties
        if (!req.body.id || !req.body.name) {
            return res.status(400).send('Invalid request body');
        }
        // Add a new item to the items array
        items.push({ ...req.body });
        // Send a success response
        res.status(201).send(items[items.length - 1]);
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).send('Internal server error');
    }
});

// GET endpoint to read all items
app.get('/items', (req, res) => {
    res.status(200).send(items);
});

// GET endpoint to read a single item by id
app.get('/items/:id', (req, res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    if (item) {
        res.status(200).send(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// PUT endpoint to update an existing item
app.put('/items/:id', (req, res) => {
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index !== -1) {
        // Update the item with new data
        items[index] = { ...items[index], ...req.body };
        res.status(200).send(items[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

// DELETE endpoint to delete an item
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index !== -1) {
        // Remove the item from the array
        items.splice(index, 1);
        res.status(200).send('Item deleted');
    } else {
        res.status(404).send('Item not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});