# Backend Setup Instructions

## Prerequisites
1. Install MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install Node.js if you haven't already: https://nodejs.org/

## Setup Steps

1. Install MongoDB:
   - Download and install MongoDB Community Server
   - Create a directory for MongoDB data: `mkdir C:\data\db`
   - Start MongoDB server: `mongod`

2. Install Dependencies:
   ```bash
   cd server
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in the server directory with:
     ```
     MONGODB_URI=mongodb://localhost:27017/jaincloths
     JWT_SECRET=your-secret-key
     ```

4. Start the Server:
   ```bash
   npm run dev
   ```

The server will start on port 5000 by default.

## API Endpoints

### Authentication

1. Register New User
   ```
   POST /api/auth/signup
   Body: { name, email, password }
   ```

2. Login User
   ```
   POST /api/auth/signin
   Body: { email, password }
   ```

## Frontend Integration

The frontend is already configured to work with the backend. Make sure:
1. The backend server is running on port 5000
2. MongoDB is running
3. You have the correct environment variables set
