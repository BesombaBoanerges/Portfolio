const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (images, CSS, JS) from Public folder
app.use(express.static(path.join(__dirname, 'Public')));

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Catch-all route (optional, serves index.html if you have frontend here)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Backend is running ");
});