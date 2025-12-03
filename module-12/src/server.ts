import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment
dotenv.config();

const app = express();
const port = 5000;

// Database
const pool = new Pool({
  connectionString: process.env.CONNECTION_STR
});

// Log when connected
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

// Create tables
async function setupDB() {
  try {
    console.log("📦 Setting up database...");
    
    // Drop old tables (clean start)
    await pool.query("DROP TABLE IF EXISTS todos CASCADE");
    await pool.query("DROP TABLE IF EXISTS users CASCADE");
    
    // Create users table
    await pool.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("✅ Users table created");
    
    // Create todos table  
    await pool.query(`
      CREATE TABLE todos(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("✅ Todos table created");
    
  } catch (error) {
    console.log("❌ Database error:", error);
  }
}

setupDB();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server is working! Try /users and /todos");
});

// 1. Create user
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    
    const result = await pool.query(
      "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    
    res.json({
      success: true,
      message: "User created",
      user: result.rows[0]
    });
    
  } catch (error: any) {
    if (error.message.includes("duplicate")) {
      res.status(400).json({
        success: false,
        message: "Email already exists!"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  }
});

// 2. Get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    res.json({
      success: true,
      users: result.rows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

// 3. Create todo
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { user_id, title } = req.body;
    
    const result = await pool.query(
      "INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *",
      [user_id, title]
    );
    
    res.json({
      success: true,
      message: "Todo created",
      todo: result.rows[0]
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

// 4. Get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT todos.*, users.name, users.email 
      FROM todos 
      JOIN users ON todos.user_id = users.id
    `);
    
    res.json({
      success: true,
      todos: result.rows
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server: http://localhost:${port}`);
  console.log("\n📌 Endpoints:");
  console.log("POST /users - Create user");
  console.log("GET  /users - Get all users");
  console.log("POST /todos - Create todo");
  console.log("GET  /todos - Get all todos");
});