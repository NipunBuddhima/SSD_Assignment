#!/bin/bash

# CSMS Project Setup Script
echo "🚀 Setting up CSMS (Courier Service Management System) Project..."

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "⚠️  MySQL server is not running. Please start MySQL first."
    echo "   You can start MySQL using: brew services start mysql (if using Homebrew)"
    echo "   Or start MySQL from System Preferences if using MySQL installer"
    exit 1
fi

echo "✅ MySQL server is running"

# Setup database
echo "📊 Setting up database..."
echo "Please make sure to:"
echo "1. Update the database credentials in backend/.env file"
echo "2. Import the database dump: mysql -u your_username -p csmsdb < database-dump/csmsdb.sql"

# Check if node_modules exist
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install
    cd ..
fi

echo "✅ Project setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your MySQL credentials"
echo "2. Import the database: mysql -u root -p csmsdb < database-dump/csmsdb.sql"
echo "3. Start backend: cd backend && npm start"
echo "4. Start frontend: cd frontend && npm start"
echo ""
echo "🌐 Application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"