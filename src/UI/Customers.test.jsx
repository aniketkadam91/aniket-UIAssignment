import { render, screen } from "@testing-library/react";
import Customers from "./Customers";
import React from "react";

describe("Customers Component", () => {
  it("renders customer rewards", async () => {
    const mockRewards = [
      {
        customerId: 1,
        customerName: "John Doe",
        monthlyRewards: {
          December: 40,
          November: 20,
        },
        totalRewards: 60,
      },
    ];

    render(<Customers rewards={mockRewards} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("December: 40 points")).toBeInTheDocument();
    expect(screen.getByText("November: 20 points")).toBeInTheDocument();
    //expect(screen.getByText(/Total Rewards: 60 points/i)).toBeInTheDocument();
  });
});
