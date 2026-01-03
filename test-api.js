#!/usr/bin/env node

/**
 * DAYFLOW HRMS - API Testing Script
 * 
 * Usage: node test-api.js
 * 
 * Tests all API endpoints and shows results
 */

const BASE_URL = 'http://localhost:8000/api';

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

// Store auth for authenticated requests
let authToken = null;

async function makeRequest(method, endpoint, body = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add basic auth header if we have credentials (testadmin:admin@123)
  const credentials = 'testadmin:admin@123';
  const base64 = Buffer.from(credentials).toString('base64');
  options.headers['Authorization'] = `Basic ${base64}`;

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, data, ok: response.ok };
  } catch (error) {
    return { status: 500, error: error.message, ok: false };
  }
}

function log(color, title, message = '') {
  console.log(`${color}${title}${colors.reset} ${message}`);
}

async function runTests() {
  log(colors.blue, '========================================');
  log(colors.blue, '  DAYFLOW HRMS - API Testing');
  log(colors.blue, '========================================\n');

  // Test 1: Login
  log(colors.yellow, '[1] Testing LOGIN Endpoint');
  log(colors.yellow, '    POST /api/login/');
  let result = await makeRequest('POST', '/login/', {
    username: 'testadmin',
    password: 'admin@123',
  });
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 2: Get All Employees
  log(colors.yellow, '\n[2] Testing GET ALL EMPLOYEES');
  log(colors.yellow, '    GET /api/employees/');
  result = await makeRequest('GET', '/employees/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  if (result.data && Array.isArray(result.data)) {
    console.log(`Found ${result.data.length} employees`);
    if (result.data.length > 0) {
      console.log('First employee:', JSON.stringify(result.data[0], null, 2));
    }
  } else {
    console.log(JSON.stringify(result.data, null, 2));
  }

  // Test 3: Get Single Employee
  log(colors.yellow, '\n[3] Testing GET SINGLE EMPLOYEE');
  log(colors.yellow, '    GET /api/employees/1/');
  result = await makeRequest('GET', '/employees/1/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 4: Check-in
  log(colors.yellow, '\n[4] Testing CHECK-IN');
  log(colors.yellow, '    POST /api/attendance/checkin/');
  result = await makeRequest('POST', '/attendance/checkin/', {});
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 5: My Attendance
  log(colors.yellow, '\n[5] Testing GET MY ATTENDANCE');
  log(colors.yellow, '    GET /api/attendance/my/');
  result = await makeRequest('GET', '/attendance/my/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 6: Apply Leave
  log(colors.yellow, '\n[6] Testing APPLY LEAVE');
  log(colors.yellow, '    POST /api/leave/apply/');
  result = await makeRequest('POST', '/leave/apply/', {
    leave_type: 'vacation',
    start_date: '2026-01-10',
    end_date: '2026-01-12',
    reason: 'Hackathon break',
  });
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 7: Get My Leaves
  log(colors.yellow, '\n[7] Testing GET MY LEAVES');
  log(colors.yellow, '    GET /api/leave/my/');
  result = await makeRequest('GET', '/leave/my/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 8: My Profile
  log(colors.yellow, '\n[8] Testing GET MY PROFILE');
  log(colors.yellow, '    GET /api/profile/');
  result = await makeRequest('GET', '/profile/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 9: Get All Leaves (Admin/HR)
  log(colors.yellow, '\n[9] Testing GET ALL LEAVES (Admin/HR)');
  log(colors.yellow, '    GET /api/leave/all/');
  result = await makeRequest('GET', '/leave/all/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  if (result.data && Array.isArray(result.data)) {
    console.log(`Found ${result.data.length} leave requests`);
  }
  console.log(JSON.stringify(result.data, null, 2));

  // Test 10: Admin Dashboard
  log(colors.yellow, '\n[10] Testing ADMIN DASHBOARD');
  log(colors.yellow, '     GET /api/dashboard/admin/');
  result = await makeRequest('GET', '/dashboard/admin/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  // Test 11: Employee Dashboard
  log(colors.yellow, '\n[11] Testing EMPLOYEE DASHBOARD');
  log(colors.yellow, '     GET /api/dashboard/employee/');
  result = await makeRequest('GET', '/dashboard/employee/');
  console.log(result.ok ? colors.green : colors.red, `Status: ${result.status}`);
  console.log(JSON.stringify(result.data, null, 2));

  log(colors.green, '\n========================================');
  log(colors.green, '  API Testing Complete!');
  log(colors.green, '========================================\n');
}

// Run tests
runTests().catch(error => {
  console.error('Test error:', error);
  process.exit(1);
});
