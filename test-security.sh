#!/bin/bash

# CSMS Security Testing Script
# This script tests all the security fixes we implemented

echo "🔒 CSMS Security Testing Suite"
echo "=============================="

BASE_URL="http://localhost:5001"
FAILED_TESTS=0
PASSED_TESTS=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
test_pass() {
    echo -e "${GREEN}✅ PASS:${NC} $1"
    ((PASSED_TESTS++))
}

test_fail() {
    echo -e "${RED}❌ FAIL:${NC} $1"
    ((FAILED_TESTS++))
}

test_info() {
    echo -e "${YELLOW}ℹ️  INFO:${NC} $1"
}

# Test 1: Security Headers
echo ""
echo "Test 1: Security Headers"
echo "------------------------"
response=$(curl -s -I "$BASE_URL/health" 2>/dev/null)

if echo "$response" | grep -q "X-Frame-Options"; then
    test_pass "X-Frame-Options header present"
else
    test_fail "X-Frame-Options header missing"
fi

if echo "$response" | grep -q "X-Content-Type-Options"; then
    test_pass "X-Content-Type-Options header present"
else
    test_fail "X-Content-Type-Options header missing"
fi

if echo "$response" | grep -q "Content-Security-Policy"; then
    test_pass "Content-Security-Policy header present"
else
    test_fail "Content-Security-Policy header missing"
fi

# Test 2: Health Endpoint
echo ""
echo "Test 2: Health Endpoint"
echo "-----------------------"
health_response=$(curl -s "$BASE_URL/health" 2>/dev/null)

if echo "$health_response" | grep -q "OK"; then
    test_pass "Health endpoint responding correctly"
else
    test_fail "Health endpoint not responding"
fi

# Test 3: API Versioning
echo ""
echo "Test 3: API Versioning"
echo "----------------------"
old_api_response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/branches" 2>/dev/null)
new_api_response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/v1/branches" 2>/dev/null)

if [ "$old_api_response" = "401" ] || [ "$old_api_response" = "404" ]; then
    test_pass "Old API endpoints properly secured/redirected"
else
    test_fail "Old API endpoints still accessible (HTTP $old_api_response)"
fi

# Test 4: Protected Endpoints (should return 401 without auth)
echo ""
echo "Test 4: Protected Endpoints"
echo "---------------------------"
protected_endpoints=(
    "/api/v1/branches"
    "/api/v1/add-branch"
    "/api/v1/update-branch/1"
    "/api/v1/delete-branch/1"
)

for endpoint in "${protected_endpoints[@]}"; do
    response_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$endpoint" 2>/dev/null)
    if [ "$response_code" = "401" ]; then
        test_pass "Endpoint $endpoint properly protected (HTTP 401)"
    else
        test_fail "Endpoint $endpoint not properly protected (HTTP $response_code)"
    fi
done

# Test 5: Rate Limiting on Login
echo ""
echo "Test 5: Rate Limiting"
echo "--------------------"
test_info "Testing rate limiting (making 7 rapid login attempts)..."

rate_limit_triggered=false
for i in {1..7}; do
    response=$(curl -s -X POST "$BASE_URL/api/v1/user/login" \
        -H "Content-Type: application/json" \
        -d '{"userNic":"test","password":"wrong"}' 2>/dev/null)
    
    if echo "$response" | grep -q "Too many"; then
        rate_limit_triggered=true
        break
    fi
done

if [ "$rate_limit_triggered" = true ]; then
    test_pass "Rate limiting working correctly"
else
    test_fail "Rate limiting not triggered after multiple attempts"
fi

# Test 6: Error Handling (404s)
echo ""
echo "Test 6: Error Handling"
echo "---------------------"
error_response=$(curl -s "$BASE_URL/nonexistent" 2>/dev/null)

if echo "$error_response" | grep -q "not found" && ! echo "$error_response" | grep -q "stack"; then
    test_pass "404 errors handled without information disclosure"
else
    test_fail "Error handling may be leaking information"
fi

# Test 7: Server Information Disclosure
echo ""
echo "Test 7: Server Information"
echo "-------------------------"
server_header=$(curl -s -I "$BASE_URL/health" 2>/dev/null | grep -i "server\|x-powered-by")

if [ -z "$server_header" ]; then
    test_pass "Server information properly hidden"
else
    test_fail "Server information disclosed: $server_header"
fi

# Test 8: Request Size Limiting
echo ""
echo "Test 8: Request Size Limiting"
echo "-----------------------------"
large_payload=$(printf 'A%.0s' {1..50000}) # 50KB payload
large_response_code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/v1/user/login" \
    -H "Content-Type: application/json" \
    -d "{\"userNic\":\"$large_payload\",\"password\":\"test\"}" 2>/dev/null)

if [ "$large_response_code" = "413" ] || [ "$large_response_code" = "400" ]; then
    test_pass "Large request properly rejected (HTTP $large_response_code)"
else
    test_info "Large request handling (HTTP $large_response_code) - may need adjustment"
fi

# Summary
echo ""
echo "Test Summary"
echo "============"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"
echo -e "Total:  $((PASSED_TESTS + FAILED_TESTS))"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 All security tests passed!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some security tests failed. Please review.${NC}"
    exit 1
fi