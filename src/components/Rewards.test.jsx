import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
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
