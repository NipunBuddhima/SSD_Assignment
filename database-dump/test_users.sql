-- Test users with known passwords for the Courier Service Management System
-- Make sure you have imported the main csmsdb.sql first!

USE csmsdb;

-- Delete test users if they already exist
DELETE FROM usercredentials WHERE userNic IN ('999999999v', '888888888v', '777777777v', '666666666v', '555555555v');

-- Insert test users with known passwords
-- Password for all test users: password

INSERT INTO usercredentials (userNic, password, roleId) VALUES
('999999999v', '$2b$10$pwX3KBvsviKGF9EHUjas/uzcQKXsHx39waFPpqi/YwdkMhRLtE2sm', 1),  -- Admin
('888888888v', '$2b$10$pwX3KBvsviKGF9EHUjas/uzcQKXsHx39waFPpqi/YwdkMhRLtE2sm', 2),  -- Branch Manager
('777777777v', '$2b$10$pwX3KBvsviKGF9EHUjas/uzcQKXsHx39waFPpqi/YwdkMhRLtE2sm', 4),  -- Delivery Person
('666666666v', '$2b$10$pwX3KBvsviKGF9EHUjas/uzcQKXsHx39waFPpqi/YwdkMhRLtE2sm', 5),  -- Transport Agent
('555555555v', '$2b$10$pwX3KBvsviKGF9EHUjas/uzcQKXsHx39waFPpqi/YwdkMhRLtE2sm', 6);  -- Client

-- Display the test users
SELECT userNic, roleId, 
  CASE roleId
    WHEN 1 THEN 'Admin'
    WHEN 2 THEN 'Branch Manager'
    WHEN 3 THEN 'Accountant'
    WHEN 4 THEN 'Delivery Person'
    WHEN 5 THEN 'Transport Agent'
    WHEN 6 THEN 'Client'
    WHEN 7 THEN 'Business Analyst'
  END AS role_name
FROM usercredentials 
WHERE userNic IN ('999999999v', '888888888v', '777777777v', '666666666v', '555555555v');

-- Test Users Summary:
-- ==================
-- NIC: 999999999v | Password: password | Role: Admin
-- NIC: 888888888v | Password: password | Role: Branch Manager  
-- NIC: 777777777v | Password: password | Role: Delivery Person
-- NIC: 666666666v | Password: password | Role: Transport Agent
-- NIC: 555555555v | Password: password | Role: Client
