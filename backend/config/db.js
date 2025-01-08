const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

let pool;

try {
  pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "wooden_beds",
  });
  console.log("Database connection pool created successfully.");
} catch (error) {
  console.error("Error creating database connection pool:", error.message);
  process.exit(1);
}

module.exports = pool.promise();
