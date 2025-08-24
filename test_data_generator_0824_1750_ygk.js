// 代码生成时间: 2025-08-24 17:50:16
// test_data_generator.js
// This program generates test data.

const faker = require('faker');

// Function to generate a random user object
function generateRandomUser() {
  try {
    // Use faker to generate random data for a user
    return {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress()
    };
  } catch (error) {
    console.error('Error generating random user:', error);
  }
}

// Function to generate a list of random users
function generateUsersList(count) {
  try {
    if (count < 1) {
      throw new Error('Count must be at least 1');
    }

    const usersList = [];
    for (let i = 0; i < count; i++) {
      usersList.push(generateRandomUser());
    }

    return usersList;
  } catch (error) {
    console.error('Error generating users list:', error.message);
  }
}

// Function to write the generated users list to a file
function writeUsersToFile(usersList, filename = 'users.json') {
  try {
    const fs = require('fs');
    const data = JSON.stringify(usersList, null, 2);
    fs.writeFileSync(filename, data);
    console.log(`Data written to ${filename} successfully!`);
  } catch (error) {
    console.error('Error writing users to file:', error);
  }
}

// Example usage:
// Generate 10 random users and write them to a file named 'test_users.json'
const usersCount = 10;
const users = generateUsersList(usersCount);
if (users) {
  writeUsersToFile(users, 'test_users.json');
}
