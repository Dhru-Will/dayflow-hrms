#!/bin/bash

# ============================================
# DAYFLOW HRMS - API Testing Guide
# ============================================
# Run this script to test all API endpoints
# Make sure both servers are running:
# Terminal 1: cd dayflow && python3 manage.py runserver 8000
# Terminal 2: npm run dev
# ============================================

BASE_URL="http://localhost:8000/api"

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}DAYFLOW HRMS - API Testing${NC}"
echo -e "${BLUE}========================================${NC}"

# ============================================
# 1. TEST LOGIN
# ============================================
echo -e "\n${YELLOW}[1] Testing LOGIN Endpoint${NC}"
echo "POST $BASE_URL/login/"
echo "Body: { login_id: 'ADM001', password: 'admin@123' }"

RESPONSE=$(curl -s -X POST "$BASE_URL/login/" \
  -H "Content-Type: application/json" \
  -d '{"login_id":"ADM001","password":"admin@123"}')

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# Extract login_id from response if available (for use in subsequent requests)
LOGIN_ID=$(echo "$RESPONSE" | jq -r '.login_id' 2>/dev/null)

# ============================================
# 2. GET ALL EMPLOYEES
# ============================================
echo -e "\n${YELLOW}[2] Testing GET ALL EMPLOYEES${NC}"
echo "GET $BASE_URL/employees/"

RESPONSE=$(curl -s -X GET "$BASE_URL/employees/" \
  -H "Content-Type: application/json")

echo "Response (first 3 employees):"
echo "$RESPONSE" | jq '.[0:3]' 2>/dev/null || echo "$RESPONSE"

# ============================================
# 3. GET SINGLE EMPLOYEE
# ============================================
echo -e "\n${YELLOW}[3] Testing GET SINGLE EMPLOYEE${NC}"
echo "GET $BASE_URL/employees/1/"

RESPONSE=$(curl -s -X GET "$BASE_URL/employees/1/" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 4. TEST CHECK-IN
# ============================================
echo -e "\n${YELLOW}[4] Testing CHECK-IN${NC}"
echo "POST $BASE_URL/attendance/checkin/"

RESPONSE=$(curl -s -X POST "$BASE_URL/attendance/checkin/" \
  -H "Content-Type: application/json" \
  -d '{}')

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 5. TEST CHECK-OUT
# ============================================
echo -e "\n${YELLOW}[5] Testing CHECK-OUT${NC}"
echo "POST $BASE_URL/attendance/checkout/"

RESPONSE=$(curl -s -X POST "$BASE_URL/attendance/checkout/" \
  -H "Content-Type: application/json" \
  -d '{}')

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 6. GET MY ATTENDANCE
# ============================================
echo -e "\n${YELLOW}[6] Testing GET MY ATTENDANCE${NC}"
echo "GET $BASE_URL/attendance/my/"

RESPONSE=$(curl -s -X GET "$BASE_URL/attendance/my/" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 7. APPLY LEAVE
# ============================================
echo -e "\n${YELLOW}[7] Testing APPLY LEAVE${NC}"
echo "POST $BASE_URL/leave/apply/"

RESPONSE=$(curl -s -X POST "$BASE_URL/leave/apply/" \
  -H "Content-Type: application/json" \
  -d '{
    "leave_type": "vacation",
    "start_date": "2026-01-10",
    "end_date": "2026-01-12",
    "reason": "Hackathon break"
  }')

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 8. GET MY LEAVES
# ============================================
echo -e "\n${YELLOW}[8] Testing GET MY LEAVES${NC}"
echo "GET $BASE_URL/leave/my/"

RESPONSE=$(curl -s -X GET "$BASE_URL/leave/my/" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 9. GET MY PROFILE
# ============================================
echo -e "\n${YELLOW}[9] Testing GET MY PROFILE${NC}"
echo "GET $BASE_URL/profile/"

RESPONSE=$(curl -s -X GET "$BASE_URL/profile/" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 10. GET ALL LEAVES (Admin/HR only)
# ============================================
echo -e "\n${YELLOW}[10] Testing GET ALL LEAVES (Admin/HR)${NC}"
echo "GET $BASE_URL/leave/all/"

RESPONSE=$(curl -s -X GET "$BASE_URL/leave/all/" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$RESPONSE" | jq '.[0:3]' 2>/dev/null || echo "$RESPONSE"

# ============================================
# 11. ADMIN DASHBOARD
# ============================================
echo -e "\n${YELLOW}[11] Testing ADMIN DASHBOARD${NC}"
echo "GET $BASE_URL/dashboard/admin/"

RESPONSE=$(curl -s -X GET "$BASE_URL/dashboard/admin/" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# ============================================
# 12. EMPLOYEE DASHBOARD
# ============================================
echo -e "\n${YELLOW}[12] Testing EMPLOYEE DASHBOARD${NC}"
echo "GET $BASE_URL/dashboard/employee/"

RESPONSE=$(curl -s -X GET "$BASE_URL/dashboard/employee/" \
  -H "Content-Type: application/json")

echo "Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}API Testing Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
