import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"; // For enhanced matchers like toBeInTheDocument
import App from "./App";
import { getLocations } from "./mock-api/apis";

jest.mock("./mock-api/apis", () => ({
  getLocations: jest.fn(),
  isNameValid: jest.fn(),
}));

describe("App", () => {
  it("renders NameForm and NameList components", async () => {
    getLocations.mockResolvedValueOnce(["Canada", "China", "USA", "Brazil"]);
    render(<App />);
    await waitFor(() => {
      expect(getLocations).toHaveBeenCalled();
    });

    // Check if NameForm and NameList components are rendered
    expect(screen.getByTestId("name-form")).toBeInTheDocument();
    expect(screen.getByTestId("name-list")).toBeInTheDocument();
  });
});
