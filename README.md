# GlowBank 🏦

GlowBank is a full-stack fintech application designed to provide a secure and intuitive digital banking experience. This project demonstrates a deep understanding of the MERN stack, focused on data integrity, security, and responsive user interfaces.

## 🚀 Key Features
- **Secure Authentication:** JWT (JSON Web Tokens) with custom middleware for persistent, secure sessions.
- **Dynamic Dashboard:** A personalized user experience that fetches real-time account balances and transaction history.
- **Role-Based Access Control (RBAC):** Distinct views and permissions for Customers, Support Staff, and Administrators.
- **Protected Routing:** Prevents unauthorized access to sensitive pages using React Router guards.

## 🛠️ Tech Stack
- **Frontend:** React.js, Bootstrap 5, Axios, React Router.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB & Mongoose.
- **Security:** Bcrypt.js, JWT.

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/glowzaq/glowbank.git](https://github.com/glowzaq/glowbank.git)
   cd glowbank

2. **Configure Environment Variables**
   Create a `.env` file in the `server` directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install

4. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install

5. **Start the Application**
   Open two separate terminals to run the backend and frontend simultaneously:

   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev

   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm run dev

6. **Access the App**
   Open your browser and navigate to:
   `http://localhost:5173`
