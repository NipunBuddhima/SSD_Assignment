# 🔐 Test Login Credentials

## How to Setup Test Users

1. **Import the main database first:**
   - Open MySQL Workbench or phpMyAdmin
   - Import `database-dump/csmsdb.sql`

2. **Import the test users:**
   - Import `database-dump/test_users.sql`

## Test User Accounts

All test users have the same password: **`password`**

| NIC Number | Password | Role | Use Case |
|------------|----------|------|----------|
| **999999999v** | password | Admin | Full system access |
| **888888888v** | password | Branch Manager | Manage branch operations |
| **777777777v** | password | Delivery Person | Handle deliveries |
| **666666666v** | password | Transport Agent | Manage transport |
| **555555555v** | password | Client | Customer access |

## Quick Login Test

### Admin Login:
- **NIC**: `999999999v`
- **Password**: `password`

### Client Login:
- **NIC**: `555555555v`
- **Password**: `password`

## Roles Breakdown:

1. **Admin (Role ID: 1)** - Full system administration
2. **Branch Manager (Role ID: 2)** - Branch operations and staff management
3. **Accountant (Role ID: 3)** - Financial management
4. **Delivery Person (Role ID: 4)** - Delivery operations
5. **Transport Agent (Role ID: 5)** - Transport coordination
6. **Client (Role ID: 6)** - Customer portal access
7. **Business Analyst (Role ID: 7)** - Analytics and reporting

## Troubleshooting

### Password Mismatch Error?
1. Make sure you imported `test_users.sql` file
2. Check that the backend is running on port 5000
3. Verify the database name in `.env` is `csmsdb`

### Cannot Connect to Server?
1. Check if backend is running: `cd backend && npm start`
2. Check if MySQL is running
3. Verify `.env` file has correct database credentials

### User Not Found?
1. Import the `test_users.sql` file
2. Check database connection in backend `.env` file
3. Verify the database name is correct

## Creating More Test Users

To create a new test user with a custom password, use this SQL:

```sql
-- Replace with your desired NIC and roleId
INSERT INTO usercredentials (userNic, password, roleId) 
VALUES ('123456789v', '$2b$10$pwX3KBvsviKGF9EHUjas/uzcQKXsHx39waFPpqi/YwdkMhRLtE2sm', 1);
```

The hash above is for password: `password`

To generate a new hash for a different password:
```bash
cd backend
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('YourPassword', 10, function(err, hash) { console.log('Hash:', hash); });"
```
