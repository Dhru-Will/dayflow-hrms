# Dayflow HRMS

A frontend-only Human Resource Management System built with Next.js App Router.

## Features

- **Role-based Access Control**: Three user roles (ADMIN, HR, EMPLOYEE)
- **Dark Theme UI**: Beautiful dark theme with violet/indigo color palette
- **Desktop-first Design**: Optimized for desktop experience
- **Employee Management**: View employee grid with role-based information visibility
- **Mock Data**: All data is frontend-only with mock services

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- CSS-in-JS (inline styles)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Login IDs

- **Admin**: `ADM001`
- **HR**: `HR001`
- **Employee**: `EMP001`

Click on any login ID in the demo section to auto-fill the login form.

## Project Structure

```
├── app/              # Next.js App Router pages
│   ├── login/       # Login page
│   ├── employees/   # Employees grid (landing page)
│   └── layout.tsx   # Root layout
├── components/       # Reusable React components
├── context/          # React context providers
├── hooks/           # Custom React hooks
├── services/         # Mock API services
├── utils/            # Utility functions
├── constants/        # Constants and mock data
└── types/            # TypeScript type definitions
```

## Business Rules

- Employees cannot self-register
- Login IDs are system-generated
- Salary information is visible ONLY to ADMIN role
- All users land on Employees Grid after login
- Backend decides role, frontend only renders UI based on role

## Role Permissions

- **ADMIN**: Can view all employee information including salary
- **HR**: Can view all employee information except salary
- **EMPLOYEE**: Can view all employee information except salary

