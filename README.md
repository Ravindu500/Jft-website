# JFT Japanese Free Learning 🇯🇵

A complete, professional, free Japanese learning platform designed for Sri Lankan students preparing for JFT-Basic.

## Features

### Student Side
- **Authentication**: Register, Login, Logout with referral code support
- **Welcome Animation**: Beautiful Japanese-style welcome for new students
- **Dashboard**: Profile, XP, streak, progress charts, learning module cards
- **Lessons**: Structured learning path with Sinhala support
- **Grammar Library**: Searchable patterns with examples and explanations
- **Vocabulary**: List view, flashcards, favorites, learned tracking
- **Kanji**: Character browser with readings, examples, favorites
- **Listening Practice**: Audio-based questions (uses browser TTS)
- **Reading Practice**: Passage comprehension with hiragana support
- **Universal Paper System**: Timed tests with scoring and review
- **JFT Style Papers & Model Papers**
- **Daily Games**: Competitive timed challenges with rewards
- **Leaderboard**: Rankings by XP
- **Referral & Wallet System**: Referral codes, earnings tracking
- **Profile Management**: Photo upload, edit details

### Admin Panel (`/admin`)
- Dashboard with stats
- Student management
- Content manager (Vocabulary, Kanji, Grammar, Lessons) — full CRUD
- Paper Builder — create papers with questions, answers, explanations
- Game Scheduler — create/schedule daily games, control status
- Popup & Announcement manager
- Settings — enable/disable dashboard cards and navigation

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Lucide Icons
- localStorage persistence (fully functional demo)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

### Demo Accounts

| Role    | Email                    | Password   |
|---------|--------------------------|------------|
| Student | kasun@example.com        | student123 |
| Admin   | admin@jftlearning.lk     | admin123   |

## Architecture

```
src/
├── components/       # Reusable UI & layout
│   ├── admin/        # Admin layout
│   └── layout/       # Navbar, MobileNav, Layout
├── data/             # Seed data
├── lib/              # Auth & Data store (context)
├── pages/
│   ├── admin/        # Admin panel pages
│   ├── auth/         # Login & Register
│   └── student/      # All student feature pages
├── types/            # TypeScript interfaces
└── App.tsx           # Routes
```

## Modular Design

Each feature is isolated in its own module/page. To update a specific section later:

- Kanji → `src/pages/student/KanjiPage.tsx` + seed data
- Daily Games → `src/pages/student/DailyGamesPage.tsx` + admin games
- Dashboard → `src/pages/student/DashboardPage.tsx`
- Popups → `src/pages/admin/AdminPopups.tsx` + data store
- Papers → `src/pages/student/PaperTakePage.tsx` + AdminPapers

## Production Notes

This demo uses localStorage for full offline functionality. For production:

1. Replace `lib/auth.tsx` and `lib/data-store.tsx` with real API calls
2. Add a backend (Node/Express, Next.js API, Supabase, Firebase, etc.)
3. Use a real database (PostgreSQL, MongoDB, SQLite)
4. Add proper password hashing and JWT/session auth
5. Server-side score validation for games and wallet

## Disclaimer

This is an independent educational platform. Not affiliated with the Japan Foundation or official JFT examinations.
