// 代码生成时间: 2025-09-23 21:26:38
const http = require('http');
const express = require('express');
const helmet = require('helmet'); // Helmet helps secure Express apps with various HTTP headers
const xss = require('xss'); // A library to sanitize input and help prevent XSS attacks

// Create an Express application
const app = express();

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Sanitize the user input using the xss library
// This function will sanitize all the data passed to it
function sanitizeInput(data) {
  return xss(data);
}

// Define a route to handle a form submission
app.post('/submit', (req, res) => {
  try {
    // Sanitize the user input to prevent XSS
    const sanitizedData = sanitizeInput(req.body);

    // After sanitization, you can use the sanitized data safely
    console.log('Sanitized Data:', sanitizedData);

    // Respond with a success message
    res.send('Data received and sanitized successfully!');
  } catch (error) {
    // Handle any potential errors
    console.error('Error sanitizing data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define a simple route to test the application
app.get('/', (req, res) => {
  res.send('Welcome to the XSS Protection Demo');
});

// Start the server
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
