// Rewards Component
import React, { useState, useEffect, useCallback } from "react";
import Customers from "../UI/Customers";
import classes from "./rewards.module.css";

// Utility functions for business logic
/**
 * Calculates reward points based on the transaction amount.
 */
const calculateRewardsForTransaction = (amount) => {
  let rewards = 0;
  if (amount > 100) {
    rewards += 2 * (amount - 100);
    amount = 100;
  }
  if (amount > 50) {
    rewards += amount - 50;
  }
  return rewards;
};

/**
 * Gets the names of the last three months, including the current month.
 * @returns {string[]} - Array of the last three month names.
 */

const getLastThreeMonths = () => {
  const currentDate = new Date();
  const months = [];

  for (let i = 0; i < 3; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    months.push(date.toLocaleString("default", { month: "long" }));
  }

  return months;
};

/**
 * Calculates rewards for a set of transactions grouped by month.
 */
const calculateRewards = (customers) => {
  const lastThreeMonths = getLastThreeMonths();

  return customers.map((customer) => {
    const monthlyRewards = {};
    let totalRewards = 0;

    customer.transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString("default", {
        month: "long",
      });

      if (lastThreeMonths.includes(month)) {
        const rewardPoints = calculateRewardsForTransaction(transaction.amount);
        monthlyRewards[month] = (monthlyRewards[month] || 0) + rewardPoints;
        totalRewards += rewardPoints;
      }
    });

    return {
      ...customer,
      monthlyRewards,
      totalRewards,
    };
  });
};

/**
 * Rewards component fetches transaction data, calculates rewards, and renders customer rewards information.
 */
const Rewards = () => {
  const [customers, setCustomers] = useState([]); // Stores fetched customer data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); //  Error handling state

  const fetchCustomerData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }

      const data = await response.json();
      const rewardsData = calculateRewards(data);
      setCustomers(rewardsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  if (loading) {
    return <div className={classes.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={classes.error}>Error: {error}</div>;
  }

  return <Customers rewards={customers} />;
};

export default Rewards;
