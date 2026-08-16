# Eventra 🎟️

Eventra is a premium event discovery and booking platform designed for seamless event browsing, secure ticket purchasing, and squad coordination. With an emphasis on user trust and group planning, Eventra replaces the hassle of screenshots and external messaging with a unified, elegant platform.

## ✨ Key Features

- **Event Discovery & Trust:** Curated event feeds with verified organizers, category filters, map views, and clear trust badges for safe bookings.
- **Secure Ticket Booking:** Smooth seat selection, a polished 3-step checkout flow, split payment options, and encrypted checkout.
- **In-App Squad Planning:** Coordinate with friends, share meetup points, invite friends to events, and organize your squad directly within the app.
- **Digital Tickets:** Shareable, verified digital tickets with a unified "My Tickets" section.
- **Engaging UI:** Smooth animations, premium aesthetics, Gamified badges, and real-time notifications.

## 🛠️ Technology Stack

- **Frontend:** React (via Vite)
- **Styling:** Vanilla CSS 
- **Animations:** Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** SQLite (`better-sqlite3`)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Clone the repository and install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Setup the backend server:**
   ```bash
   cd server
   npm install
   ```

3. **Run the Development Servers:**
   - **Start Backend:**
     Open a terminal, navigate to the `server` directory, and run:
     ```bash
     node index.js
     ```
     (Runs on http://localhost:3001)

   - **Start Frontend:**
     Open another terminal in the root directory and run:
     ```bash
     npm run dev
     ```
     (Open `http://localhost:5173` in your browser)

## 🗄️ Database Schema Overview

The backend uses a local SQLite database (`eventra.db`). Core tables include:
- `tickets`: Stores event bookings with details on event, time, seats, and total price.
