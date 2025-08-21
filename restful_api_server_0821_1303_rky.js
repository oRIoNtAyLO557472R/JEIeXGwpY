// 代码生成时间: 2025-08-21 13:03:05
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define a simple in-memory data store
const users = [];

// GET endpoint to retrieve users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// POST endpoint to create a new user
app.post('/users', (req, res) => {
  const user = req.body;
  if (!user.name || !user.age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }
  users.push(user);
  res.status(201).json(user);
});

// PUT endpoint to update an existing user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (req.body.name) user.name = req.body.name;
  if (req.body.age) user.age = req.body.age;
  res.status(200).json(user);
});

// DELETE endpoint to remove a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Documentation
/**
 * @api {get} /users Retrieve all users
 * @apiSuccess {Array} users List of all users
 *
 * @api {post} /users Create a new user
 * @apiParam {String} name User's name
 * @apiParam {Number} age User's age
 * @apiSuccess {Object} user The newly created user object
 *
 * @api {put} /users/:id Update an existing user
 * @apiParam {Number} id User's unique ID
 * @apiParam {String} [name] User's new name (optional)
 * @apiParam {Number} [age] User's new age (optional)
 * @apiSuccess {Object} user The updated user object
 *
 * @api {delete} /users/:id Delete a user
 * @apiParam {Number} id User's unique ID
 * @apiSuccess {String} message Confirmation message
 */