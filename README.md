# Rewards Points Tracker

## Overview

The Rewards Points Tracker is a React-based web application designed to calculate and display reward points for customers based on their transaction data. The system fetches transaction data from a backend API, processes it to compute rewards, and displays monthly and total reward points for each customer.

## Features

- Fetches customer transaction data from an API.
- Calculates reward points based on transaction amounts.
- Displays rewards for the last three months.
- Shows detailed monthly and total rewards for each customer.
- Loading state for better user experience.
- Modular and reusable components.
- Optimized code structure for performance and maintainability.

## Technology Stack

- **Frontend:** React, CSS Modules
- **Testing:** Vitest, @testing-library/react

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aniketkadam91/aniket-UIAssignment.git
   cd aniket-UIAssignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```
5. open backend

```bash
 cd backend
```

6. Install dependencies:
   ```bash
   npm install
   ```
7. Start the backend server:
   ```bash
   node server.js
   ```

## API Endpoint

The application fetches transaction data from:

```
http://localhost:3001/api/transactions
```

Ensure your backend server is running and serving data in the following format:

```json
[
  {
    "customerId": 1,
    "customerName": "John Doe",
    "transactions": [
      { "transactionId": 101, "amount": 120, "date": "2024-12-05" },
      { "transactionId": 102, "amount": 80, "date": "2024-11-20" }
    ]
  }
]
```

## Reward Calculation

- **For amounts over $100:** 2 points for every dollar spent above $100.
- **For amounts between $50 and $100:** 1 point for every dollar spent above $50.
- Transactions below $50 do not earn points.

## Tests

Run unit tests with Vitest:

```bash
npm run test
```

Tests are included for:

- **Rewards Component:** Ensuring proper reward calculation and API integration.
- **Customers Component:** Verifying the display of customer rewards.
