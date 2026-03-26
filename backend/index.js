const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API route
app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// ROOT route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
