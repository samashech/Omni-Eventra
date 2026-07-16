# CampusHub (clubs@mity) 🎓

CampusHub is a premium, beautifully-designed platform that bridges the gap between university students and campus organizations. It provides a centralized ecosystem for students to discover clubs, RSVP to events, and apply for core team positions, while giving club leaders a powerful CRM/ATS dashboard to manage their community.

## ✨ Key Features

- **Dual-Role Authentication:** 
  - Seamless **Google OAuth** for quick student onboarding.
  - Secure, internal custom login credentials for Club Leaders.
- **Dynamic Student Dashboard:** Personalized event feeds, calendar conflict detection, and curated club recommendations.
- **Interactive Club Profiles:** 
  - Real-time follower counts tracked via Supabase.
  - Conditional Recruitment blocks that unlock when a student follows a club.
- **Leader Command Center (ATS/CRM):** 
  - Manage live applications and recruiting pipelines.
  - Broadcast announcements and post upcoming events.
- **Premium Aesthetics:** 
  - Smooth micro-animations powered by Framer Motion.
  - A breathtaking, pure-black **True Dark Mode** utilizing CSS variable injection and glassmorphism.

## 🛠️ Technology Stack

- **Frontend Framework:** React (via Vite)
- **Styling:** Vanilla CSS (CSS Variables, Glassmorphism, Custom Theme Toggles)
- **Animations:** Framer Motion
- **Backend & Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Google Provider + Email/Password)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Note: Ensure your Supabase project has Google OAuth enabled in the Auth providers settings).*

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

## 🗄️ Database Schema Overview

The app relies on the following core Supabase tables:
- `clubs`: Stores club profiles, followers count, categories, and theme colors.
- `applications`: Acts as an Applicant Tracking System (ATS), capturing student applications for club roles.

*(If you are setting this up from scratch, ensure RLS policies allow the necessary read/insert operations for authenticated users).*
