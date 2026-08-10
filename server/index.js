const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database('eventra.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eventId INTEGER,
    eventTitle TEXT,
    eventCategory TEXT,
    eventDate TEXT,
    eventTime TEXT,
    eventLocation TEXT,
    seats TEXT,
    totalPrice INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API Endpoints
app.post('/api/tickets', (req, res) => {
  const { eventId, eventTitle, eventCategory, eventDate, eventTime, eventLocation, seats, totalPrice } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO tickets (eventId, eventTitle, eventCategory, eventDate, eventTime, eventLocation, seats, totalPrice) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const info = stmt.run(eventId, eventTitle, eventCategory, eventDate, eventTime, eventLocation, JSON.stringify(seats), totalPrice);
  res.json({ success: true, id: info.lastInsertRowid });
});

app.get('/api/tickets', (req, res) => {
  const stmt = db.prepare('SELECT * FROM tickets ORDER BY createdAt DESC');
  const tickets = stmt.all().map(t => ({
    ...t,
    seats: JSON.parse(t.seats)
  }));
  res.json(tickets);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
