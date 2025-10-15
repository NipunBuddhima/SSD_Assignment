// Script to create test users in the database
// Run this with: node create_test_users.js

import { pool } from './database/database.js';
import bcrypt from 'bcrypt';

const testUsers = [
    { nic: '999999999v', password: 'password', roleId: 1, roleName: 'Admin' },
    { nic: '888888888v', password: 'password', roleId: 2, roleName: 'Branch Manager' },
    { nic: '777777777v', password: 'password', roleId: 4, roleName: 'Delivery Person' },
    { nic: '666666666v', password: 'password', roleId: 5, roleName: 'Transport Agent' },
    { nic: '555555555v', password: 'password', roleId: 6, roleName: 'Client' }
];

async function createTestUsers() {
    console.log('🔧 Creating test users...\n');

    try {
        for (const user of testUsers) {
            // Check if user already exists
            const [existing] = await pool.query(
                'SELECT * FROM usercredentials WHERE userNic = ?',
                [user.nic]
            );

            if (existing.length > 0) {
                console.log(`⚠️  User ${user.nic} (${user.roleName}) already exists. Updating password...`);

                // Hash the password
                const hashedPassword = await bcrypt.hash(user.password, 10);

                // Update existing user
                await pool.query(
                    'UPDATE usercredentials SET password = ?, roleId = ? WHERE userNic = ?',
                    [hashedPassword, user.roleId, user.nic]
                );

                console.log(`✅ Updated: ${user.nic} - ${user.roleName}\n`);
            } else {
                // Hash the password
                const hashedPassword = await bcrypt.hash(user.password, 10);

                // Insert new user
                await pool.query(
                    'INSERT INTO usercredentials (userNic, password, roleId) VALUES (?, ?, ?)',
                    [user.nic, hashedPassword, user.roleId]
                );

                console.log(`✅ Created: ${user.nic} - ${user.roleName}\n`);
            }
        }

        console.log('\n🎉 Test users created successfully!\n');
        console.log('═══════════════════════════════════════');
        console.log('📋 TEST LOGIN CREDENTIALS');
        console.log('═══════════════════════════════════════');
        console.log('Password for ALL users: password\n');

        testUsers.forEach(user => {
            console.log(`NIC: ${user.nic.padEnd(15)} | Role: ${user.roleName}`);
        });

        console.log('═══════════════════════════════════════\n');
        console.log('Try logging in with:');
        console.log('  NIC: 999999999v');
        console.log('  Password: password\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating test users:', error.message);
        console.error('\nMake sure:');
        console.error('  1. MySQL is running');
        console.error('  2. Database "csmsdb" exists');
        console.error('  3. You have imported csmsdb.sql first');
        console.error('  4. .env file has correct database credentials\n');
        process.exit(1);
    }
}

// Run the function
createTestUsers();
