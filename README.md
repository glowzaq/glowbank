# GlowBank 🏦
A modern, secure full-stack banking application. This project features a React frontend and a Node.js/Express backend managed as a monorepo.

## Project Features (Planned)
- **Secure Authentication**: JWT-based login and encrypted passwords.
- **Account Management**: Support for Checking and Savings accounts.
- **Real-time Transactions**: Transfer funds between accounts and users.
- **Transaction History**: Detailed logs of all financial activity.


## 🚀 Recent Updates
- **User Authentication**: Implemented secure Registration and Login logic.
- **Password Security**: Integrated `bcryptjs` for salt-based password hashing.
- **Session Management**: Configured `jsonwebtoken` (JWT) for secure, stateless authentication.
- **Protected Routes**: Added a custom `authMiddleware` to verify tokens and protect sensitive API endpoints.

## Tech Stack
- **Frontend**: [React](react.dev) + [Vite](vitejs.dev)
- **Backend**: [Node.js](nodejs.org) + [Express](expressjs.com)
- **Database**: [MongoDB](www.mongodb.com) + [Mongoose](mongoosejs.com)
- **Utilities**: Concurrently, Dotenv, Bcrypt.js

## Project Structure
glowbank/
├── frontend/        # React client application
├── backend/         # Express server & API
│   ├── src/
│   │   ├── controllers/ # Auth & Logic handlers
│   │   ├── middleware/  # Auth protection middleware
│   │   ├── models/      # Mongoose Schemas (User, Account, Transaction)
│   │   └── utils/       # JWT generation helpers
├── package.json     # Root configuration & scripts
└── .gitignore       # Global ignore rules

