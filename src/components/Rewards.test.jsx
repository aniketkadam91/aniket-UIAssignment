import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { calculateRewardsForTransaction, calculateRewards } from "./Rewards";
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from "vitest";
import Rewards from "./Rewards";

// Mock Customers component
vi.mock("../UI/Customers", () => ({
  __esModule: true,
  default: () => <div data-testid="customers">Mocked Customers Component</div>,
}));

describe("Rewards Component", () => {
  it("displays a loading message initially", () => {
    render(<Rewards />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders customer rewards data when API call succeeds", async () => {
    render(<Rewards />);

    await waitFor(() => {
      expect(screen.getByTestId("customers")).toBeInTheDocument();
    });
  });
});

describe("calculateRewardsForTransaction", () => {
  it("should return 0 rewards for transaction amounts <= 50", () => {
    expect(calculateRewardsForTransaction(50)).toBe(0);
    expect(calculateRewardsForTransaction(30)).toBe(0);
  });

  it("should return (amount - 50) rewards for transaction amounts between 51 and 100", () => {
    expect(calculateRewardsForTransaction(75)).toBe(25); // 75 - 50 = 25
    expect(calculateRewardsForTransaction(100)).toBe(50); // 100 - 50 = 50
  });

  it("should calculate rewards for transaction amounts > 100", () => {
    expect(calculateRewardsForTransaction(120)).toBe(90); // 2 * (120 - 100) + 50 = 90
    expect(calculateRewardsForTransaction(150)).toBe(150); // 2 * (150 - 100) + 50 = 150
  });

  it("should return 0 rewards for non-positive transaction amounts", () => {
    expect(calculateRewardsForTransaction(0)).toBe(0);
    expect(calculateRewardsForTransaction(-20)).toBe(0); // Negative amounts are not realistic but should return 0
  });

  it("calculates rewards for transactions in the last three months", () => {
    const customers = [
      {
        customerId: 1,
        customerName: "John Doe",
        transactions: [
          { transactionId: 101, amount: 120, date: "2025-01-10" }, // January
          { transactionId: 102, amount: 80, date: "2024-12-15" }, // December
          { transactionId: 103, amount: 50, date: "2024-10-10" }, // October (ignored)
        ],
      },
    ];

    const result = calculateRewards(customers);

    expect(result).toEqual([
      {
        customerId: 1,
        customerName: "John Doe",
        transactions: [
          { transactionId: 101, amount: 120, date: "2025-01-10" },
          { transactionId: 102, amount: 80, date: "2024-12-15" },
          { transactionId: 103, amount: 50, date: "2024-10-10" },
        ],
        monthlyRewards: {
          January: 90, // (120 - 100) * 2 = 40 + (100 - 50) = 90
          December: 30, // 80 - 50 = 30
        },
        totalRewards: 120, // 90 + 30
      },
    ]);
  });

  it("ignores transactions outside the last three months", () => {
    const customers = [
      {
        customerId: 2,
        customerName: "Jane Smith",
        transactions: [
          { transactionId: 201, amount: 200, date: "2024-09-10" }, // September (ignored)
          { transactionId: 202, amount: 50, date: "2024-10-05" }, // October (ignored)
        ],
      },
    ];

    const result = calculateRewards(customers);

    expect(result).toEqual([
      {
        customerId: 2,
        customerName: "Jane Smith",
        transactions: [
          { transactionId: 201, amount: 200, date: "2024-09-10" },
          { transactionId: 202, amount: 50, date: "2024-10-05" },
        ],
        monthlyRewards: {}, // No rewards as transactions are outside the last three months
        totalRewards: 0, // Total rewards are zero
      },
    ]);
  });
});
