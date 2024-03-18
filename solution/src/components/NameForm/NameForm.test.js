import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For enhanced matchers like toBeInTheDocument
import NameForm from "./NameForm";

// Mock the onSubmit function
const mockOnSubmit = jest.fn();

describe("NameForm", () => {
  test("renders form with name and location fields", () => {
    render(<NameForm loading={false} errors={{ name: [], location: [] }} />);
    const nameInput = screen.getByLabelText("Name");
    const locationSelect = screen.getByLabelText("Location");
    const addButton = screen.getByText("Add");
    const clearButton = screen.getByText("Clear");

    expect(nameInput).toBeInTheDocument();
    expect(locationSelect).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  test("updates input values when typing", () => {
    render(
      <NameForm
        loading={false}
        errors={{ name: [], location: [] }}
        locations={["Location 1"]}
      />
    );

    // Simulate typing in the Name input field
    fireEvent.change(screen.getByTestId("inline-name"), {
      target: { value: "John Doe" },
    });

    // Assert that the input value is updated
    expect(screen.getByTestId("inline-name")).toHaveValue("John Doe");

    // Simulate selecting an option in the Location dropdown
    fireEvent.change(screen.getByTestId("inline-location"), {
      target: { value: "Location 1" },
    });

    // Assert that the dropdown value is updated
    expect(screen.getByTestId("inline-location")).toHaveValue("Location 1");
  });

  test("calls onSubmit with form values when submitted", () => {
    render(
      <NameForm
        loading={false}
        errors={{ name: [], location: [] }}
        locations={["Location 1"]}
        onCreate={mockOnSubmit}
      />
    );

    // Simulate typing in the Name input field
    fireEvent.change(screen.getByTestId("inline-name"), {
      target: { value: "John Doe" },
    });

    // Simulate selecting an option in the Location dropdown
    fireEvent.change(screen.getByTestId("inline-location"), {
      target: { value: "Location 1" },
    });

    // Simulate form submission
    fireEvent.submit(screen.getByTestId("name-form"));

    // Assert that onSubmit is called with the form values
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      location: "Location 1",
    });
  });
});
