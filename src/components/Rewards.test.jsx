import { render, screen } from "@testing-library/react";
import Rewards from "./Rewards";

describe("Rewards Component", () => {
  it("renders loading state initially", () => {
    render(<Rewards />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Mock API or component behavior for further tests
});
