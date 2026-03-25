const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

//  DB CONNECTION
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//  CHECK DB CONNECTION
pool.connect()
  .then(() => console.log("Connected to PostgreSQL "))
  .catch(err => console.error("DB CONNECTION ERROR ", err));

//  CREATE TABLE
async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table ready ");
  } catch (err) {
    console.error("TABLE ERROR ", err);
  }
}
createTable();

// ROUTES
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

//  SUBMIT ROUTE (FINAL)
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    const result = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    console.log("Inserted:", result.rows[0]);

    res.json({
      success: true,
      message: "Message saved successfully"
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});