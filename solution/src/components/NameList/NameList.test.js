import React from "react";
import { render, screen } from "@testing-library/react";
import NameList from "./NameList";

describe("NameList", () => {
  test("renders a list of names and locations", () => {
    // Sample data
    const list = [
      { name: "John", location: "New York" },
      { name: "Alice", location: "London" },
      { name: "Bob", location: "Paris" },
    ];

    // Render the component with sample data
    render(<NameList list={list} />);

    // Check if the NameList component is rendered
    const nameList = screen.getByTestId("name-list");
    expect(nameList).toBeInTheDocument();

    // Check if each name and location is rendered in the table
    list.forEach(({ name, location }) => {
      const nameElement = screen.getByText(name);
      const locationElement = screen.getByText(location);
      expect(nameElement).toBeInTheDocument();
      expect(locationElement).toBeInTheDocument();
    });
  });
});
