// 代码生成时间: 2025-09-22 12:41:46
// Import the mysql2 package
const mysql = require('mysql2');

// Configuration for the database connection pool
const poolConfig = {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(poolConfig);

// Function to query the database
async function queryDatabase(sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            // Execute the SQL query
            connection.query(sql, params, (queryErr, results) => {
                connection.release(); // Always release the connection when done
                if (queryErr) {
                    reject(queryErr);
                    return;
                }
                resolve(results);
            });
        });
    });
}

// Example usage of the queryDatabase function
async function exampleQuery() {
    try {
        const results = await queryDatabase('SELECT * FROM your_table', []);
        console.log(results); // Process the results
    } catch (error) {
        console.error('Query failed:', error);
    }
}

// Export the queryDatabase function for use by other modules
module.exports = { queryDatabase };

// Uncomment the following line to run the example query when the script is executed directly
// exampleQuery();