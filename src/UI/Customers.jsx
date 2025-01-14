import React, { memo } from "react";
import classes from "./customers.module.css";

/**
 * Renders a list of customers with their monthly and total reward points.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array} props.rewards - Array of customer rewards data.
 * @returns {JSX.Element} - Rendered list of customers.
 */

const Customers = memo(({ rewards }) => {
  return (
    <ul className={classes.customers}>
      {rewards.map((customer) => (
        <li key={customer.customerId} className={classes.customerItem}>
          <h2 className={classes.customerName}>{customer.customerName}</h2>
          <h3 className={classes.monthlyRewardsHeading}>Monthly Rewards:</h3>
          <ul className={classes.monthlyRewards}>
            {Object.entries(customer.monthlyRewards).map(([month, points]) => (
              <li key={month} className={classes.monthItem}>
                {month}: {points} points
              </li>
            ))}
          </ul>
          <div className={classes.totalrewards}>
            <span className={classes.bold}>Total Rewards:</span>{" "}
            <span className={classes.aqua}>{customer.totalRewards} points</span>
          </div>
        </li>
      ))}
    </ul>
  );
});

export default Customers;
