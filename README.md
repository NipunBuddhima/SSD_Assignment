# Courier Service Management System (CSMS)

A comprehensive system for managing courier services efficiently with React frontend and Node.js backend.

## 🚀 Quick Setup

Run the automated setup script:
```bash
./setup.sh
```

## 📋 Prerequisites

- Node.js (v14 or higher) - [Download Node.js](https://nodejs.org/en/download)
- MySQL (v8.0 or higher) - [Download MySQL](https://dev.mysql.com/downloads/installer/)
- Git - [Download Git](https://git-scm.com/downloads)

## 🛠️ Manual Setup

### 1. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### 2. Database Setup
```bash
# Import the database
./import-db.sh
# OR manually:
# mysql -u root -p csmsdb < database-dump/csmsdb.sql
```

### 3. Environment Configuration

**Backend (.env)**:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=csmsdb
JWT_SECRET=your_jwt_secret_key_here
```

**Frontend (.env)**:
```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm start
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🏗️ Project Structure

```
├── backend/          # Node.js/Express API
├── frontend/         # React Application  
├── database-dump/    # MySQL Database Schema
├── setup.sh         # Automated setup script
└── import-db.sh     # Database import script
```
