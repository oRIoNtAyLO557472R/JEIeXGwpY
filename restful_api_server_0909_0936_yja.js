// 代码生成时间: 2025-09-09 09:36:01
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// RESTful API route for creating a new resource
app.post('/api/resource', (req, res) => {
  // Validate request body
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Create a new resource (for example, saving to a database)
  const resource = {
    id: Date.now(),
    name: req.body.name
  };
  // In a real application, you would save this resource to a database
  
  // Respond with the created resource
  res.status(201).json(resource);
});

// RESTful API route for getting a single resource by ID
app.get('/api/resource/:id', (req, res) => {
  // Retrieve the resource from the database based on the provided ID
  // In a real application, you would have a database query here
  const resource = {
    id: req.params.id,
    name: 'Example Resource'
  };
  
  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  
  // Respond with the resource
  res.json(resource);
});

// RESTful API route for updating a resource by ID
app.put('/api/resource/:id', (req, res) => {
  // Validate request body
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Update the resource in the database based on the provided ID
  // In a real application, you would have a database query and update here
  const updatedResource = {
    id: req.params.id,
    name: req.body.name
  };
  
  // Respond with the updated resource
  res.json(updatedResource);
});

// RESTful API route for deleting a resource by ID
app.delete('/api/resource/:id', (req, res) => {
  // Delete the resource from the database based on the provided ID
  // In a real application, you would have a database query and delete here
  
  // Respond with a success message
  res.status(200).json({ message: 'Resource deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});