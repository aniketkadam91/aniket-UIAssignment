# Rewards Component

## Overview

The `Rewards` component is responsible for fetching transaction data, calculating rewards, and passing the data to the `Customers` component for display.

## Key Features

- Fetches transaction data from a backend API.
- Calculates monthly and total rewards for each customer.
- Handles loading and error states.

## Props

This component does not accept any props.

## Methods

- `fetchCustomerData`: Fetches data from the backend.
- `calculateRewardsForTransaction`: Computes reward points for a given transaction.
- `calculateRewards`: Aggregates rewards by customer and month.
