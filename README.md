# Eventra

**DemoVersion:** [omni-eventra.vercel.app](https://omni-eventra.vercel.app)

**Hackathon:** UX Imperium

Eventra is a premium event discovery and booking platform designed for seamless event browsing, secure ticket purchasing, and squad coordination. With an emphasis on user trust and group planning, Eventra replaces the hassle of screenshots and external messaging with a unified, elegant platform.

## Key Features

- **Event Discovery & Trust:** Curated event feeds with verified organizers, category filters, map views, and clear trust badges for safe bookings.
- **Secure Ticket Booking:** Smooth seat selection, a polished 3-step checkout flow, split payment options, and encrypted checkout.
- **In-App Squad Planning:** Coordinate with friends, share meetup points, invite friends to events, and organize your squad directly within the app.
- **Digital Tickets:** Shareable, verified digital tickets with a unified "My Tickets" section.
- **Engaging UI:** Smooth animations, premium aesthetics, Gamified badges, and real-time notifications.

## Technology Stack

- **Frontend:** React (via Vite)
- **Styling:** Vanilla CSS 
- **Animations:** Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** SQLite (`better-sqlite3`)

## Database Schema Overview

The backend uses a local SQLite database (`eventra.db`). Core tables include:
- `tickets`: Stores event bookings with details on event, time, seats, and total price.
