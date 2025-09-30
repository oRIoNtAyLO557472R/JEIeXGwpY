// 代码生成时间: 2025-09-30 20:42:42
// Import necessary Node.js modules
const fs = require('fs');
const express = require('express');
const socketIo = require('socket.io');
const path = require('path');

// Initialize the Express app
const app = express();
const server = require('http').createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Set the port for the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Serve static files like HTML, CSS, and JS
app.use(express.static(path.join(__dirname, 'public')));

// Handle incoming connections and setup socket.io listeners
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for the 'message' event from the client
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Emit the message to all connected clients
    io.emit('message', data);
  });

  // Listen for the 'disconnect' event when a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

/**
 * @function sendEditorContent
 * Sends the current editor content to all connected clients.
 * @param {string} content - The content to be sent.
 */
function sendEditorContent(content) {
  io.emit('editorContent', { content });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app for testing purposes
module.exports = app;