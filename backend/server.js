const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
const db = new sqlite3.Database("./message.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite DB ✅");
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  message TEXT,
  date TEXT
)`);

// POST route to save messages
app.post("/submit-message", (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date().toISOString();

  if (!name || !email || !message) {
    return res.json({ success: false, error: "All fields required" });
  }

  db.run(
    "INSERT INTO messages (name, email, message, date) VALUES (?, ?, ?, ?)",
    [name, email, message, date],
    function (err) {
      if (err) return res.json({ success: false, error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// GET route to see all messages
app.get("/messages", (req, res) => {
  db.all("SELECT * FROM messages ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.json({ success: false, error: err.message });
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
