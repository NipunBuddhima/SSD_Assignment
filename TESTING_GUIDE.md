# Manual Security Testing Guide

## Prerequisites
1. Start the backend server: `cd backend && npm start`
2. Make sure the server is running on http://localhost:5001

## Test 1: Security Headers Test

**Purpose:** Verify that security headers are properly implemented

```bash
# Test security headers
curl -I http://localhost:5001/health

# Expected headers to see:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Content-Security-Policy: default-src 'self'...
# Strict-Transport-Security: max-age=31536000; includeSubDomains
```

**✅ PASS:** All security headers are present
**❌ FAIL:** Missing any of the above headers

---

## Test 2: Authentication Protection Test

**Purpose:** Verify that protected endpoints require authentication

```bash
# Test unprotected access to admin endpoints
curl -X GET http://localhost:5001/api/v1/branches

# Expected response: HTTP 401 Unauthorized
# Expected JSON: {"success": false, "message": "Access denied. No token provided."}
```

**✅ PASS:** Returns 401 Unauthorized
**❌ FAIL:** Returns data or 200 OK

---

## Test 3: Rate Limiting Test

**Purpose:** Verify brute force protection on login

```bash
# Make multiple rapid login attempts
for i in {1..7}; do
  echo "Attempt $i:"
  curl -X POST http://localhost:5001/api/v1/user/login \
    -H "Content-Type: application/json" \
    -d '{"userNic":"invalid","password":"wrong"}'
  echo ""
done
```

**✅ PASS:** After 5 attempts, returns "Too many login attempts"
**❌ FAIL:** Allows unlimited attempts

---

## Test 4: Role-Based Access Control Test

**Purpose:** Test that only admins can access admin endpoints

### Step 1: Login as Admin
```bash
# Login with admin credentials
curl -X POST http://localhost:5001/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"userNic":"123456789V","password":"admin123"}' \
  -c cookies.txt
```

### Step 2: Test Admin Access
```bash
# Try to access admin-only endpoint with admin token
curl -X GET http://localhost:5001/api/v1/branches \
  -b cookies.txt
```

**✅ PASS:** Admin can access the endpoint
**❌ FAIL:** Admin gets 403 Forbidden

### Step 3: Test Non-Admin Access
```bash
# Login as regular user (if available) or use expired/invalid token
curl -X GET http://localhost:5001/api/v1/branches \
  -H "Cookie: jwt=invalid_token"
```

**✅ PASS:** Non-admin gets 401/403 error
**❌ FAIL:** Non-admin can access admin endpoints

---

## Test 5: API Versioning Test

**Purpose:** Verify old API endpoints are secured

```bash
# Test old API endpoint (should be secured/redirected)
curl -X GET http://localhost:5001/api/branches

# Test new API endpoint structure
curl -X GET http://localhost:5001/api/v1/branches
```

**✅ PASS:** Old endpoints return 401/404, new endpoints have proper auth
**❌ FAIL:** Old endpoints still work without protection

---

## Test 6: Error Handling Test

**Purpose:** Verify no information disclosure in errors

```bash
# Test 404 handling
curl http://localhost:5001/nonexistent-endpoint

# Test invalid JSON
curl -X POST http://localhost:5001/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d 'invalid json'
```

**✅ PASS:** Clean error messages without stack traces or server info
**❌ FAIL:** Detailed error messages revealing server information

---

## Test 7: Input Validation Test

**Purpose:** Test payload size limits and input sanitization

```bash
# Test large payload (should be rejected)
curl -X POST http://localhost:5001/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"userNic":"'$(printf 'A%.0s' {1..50000})'","password":"test"}'
```

**✅ PASS:** Large payload rejected with appropriate error
**❌ FAIL:** Server accepts unlimited payload sizes

---

## Test 8: Health Check Test

**Purpose:** Verify monitoring endpoint works correctly

```bash
# Test health endpoint
curl http://localhost:5001/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "service": "CSMS API"
}
```

**✅ PASS:** Returns proper health status
**❌ FAIL:** Health endpoint not working

---

## Test 9: HTTPS Redirect Test (Production)

**Purpose:** Verify HTTPS enforcement in production

```bash
# Only applicable in production with HTTPS setup
curl -I http://your-domain.com/health

# Should redirect to HTTPS or return HSTS headers
```

---

## Test 10: Database Security Test

**Purpose:** Test that database credentials are secure

```bash
# Verify environment variables are not exposed
curl http://localhost:5001/.env
curl http://localhost:5001/config
```

**✅ PASS:** Returns 404 Not Found
**❌ FAIL:** Exposes configuration files

---

## Quick Security Audit Commands

```bash
# Check for common vulnerabilities
echo "1. Testing security headers..."
curl -I http://localhost:5001/health | grep -E "(X-Frame|X-Content|Content-Security|Strict-Transport)"

echo "2. Testing authentication..."
curl -w "HTTP Status: %{http_code}\n" -o /dev/null -s http://localhost:5001/api/v1/branches

echo "3. Testing rate limiting..."
for i in {1..6}; do curl -s -X POST http://localhost:5001/api/v1/user/login -d '{}' -H "Content-Type: application/json" | grep -o "Too many" && break; done

echo "4. Testing error handling..."
curl -s http://localhost:5001/invalid | jq . 2>/dev/null || echo "Invalid JSON response"
```

## Expected Security Test Results Summary

| Test | Expected Result |
|------|-----------------|
| Security Headers | ✅ All headers present |
| Authentication | ✅ 401 for unauth requests |
| Rate Limiting | ✅ Blocks after 5 attempts |
| Role-Based Access | ✅ Admins only for admin endpoints |
| API Versioning | ✅ Old endpoints secured |
| Error Handling | ✅ No info disclosure |
| Input Validation | ✅ Large payloads rejected |
| Health Check | ✅ Returns status JSON |

If all tests pass, your security implementation is working correctly! 🔒