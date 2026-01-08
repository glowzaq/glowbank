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

## 🚀 Recent Updates

### 💳 Financial Architecture
The system has been upgraded from a single-model approach to a **linked-model architecture** for better data integrity and security:
* **User Model:** Handles authentication, profile details, and roles.
* **Account Model:** A dedicated collection for financial data, tracking `balance` and `accountNumber` via a `userId` reference.
* **Transaction Model:** Records all movement of funds with references to both `accountId` (sender) and `recipientId`.

### 📧 Features
* **Email-Based Transfers:** Users can now send money using the recipient's email address. The system automatically resolves the email to the correct internal account.
* **Real-Time Dashboard:** The UI now fetches live data from the Account model to display the current balance and a filtered transaction history.

---

## 🛠 API Reference

### Transactions
#### Transfer Funds
`POST /api/transaction/transfer`

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `recipientEmail` | `string` | **Required**. The email of the person receiving funds. |
| `amount` | `number` | **Required**. The total amount to transfer. |

**Response:**
```json
{
  "message": "Transfer successful",
  "newTransaction": { ... }
}

#### Get Dashboard Data
`GET /api/transaction/data`

Fetches the authenticated users current account balance and their complete transaction history (both sent and received).

**Headers:**
| Key | Value | Description |
| :--- | :--- | :--- |
| `Authorization` | `Bearer <token>` | **Required**. Valid JWT token. |

**Success Response (200 OK):**
```json
{
  "balance": 5000,
  "transaction": [
    {
      "_id": "658a...",
      "accountId": "658b...",
      "recipientId": "658c...",
      "amount": 500,
      "type": "Transfer",
      "description": "Transfer to Jane",
      "status": "Completed",
      "createdAt": "2026-01-07T14:30:00Z"
    }
  ]
}

**Error Response (500 Internal Server Error):**
```json
{
  "message": "Error fetching data"
}


### Deposit Funds
`POST /api/transaction/deposit`

Adds funds to the authenticated user's account and records a transaction entry.

**Request Body:**
| Field | Type | Description |
| :--- | :--- | :--- |
| `amount` | Number | **Required**. The amount to deposit. |
| `description` | String | Optional. Description of the deposit. |

**Success Response (200 OK):**
```json
{
  "message": "Deposit successful",
  "newBalance": 6000
}