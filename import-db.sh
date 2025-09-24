#!/bin/bash

# Database Import Script for CSMS Project
echo "📊 Importing CSMS Database..."

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "❌ MySQL server is not running. Please start MySQL first."
    exit 1
fi

# Default credentials (user should modify these)
DB_USER="root"
DB_NAME="csmsdb"

echo "Enter your MySQL password:"
mysql -u $DB_USER -p $DB_NAME < database-dump/csmsdb.sql

if [ $? -eq 0 ]; then
    echo "✅ Database imported successfully!"
    echo "Database 'csmsdb' is ready to use."
else
    echo "❌ Database import failed. Please check your MySQL credentials."
fi