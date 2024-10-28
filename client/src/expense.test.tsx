import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("ExpenseItem", () => {
    test("should display the expense item correctly", () => {
      render(<App />);

      const nameInput = screen.getByLabelText(/name/i);
      const costInput = screen.getByLabelText(/cost/i);

      fireEvent.change(nameInput, { target: { value: "Groceries" } });
      fireEvent.change(costInput, { target: { value: "50" } });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);

      const testItemName = screen.getByText("Groceries");
      const testSpentCost = screen.getByText("$50");
      const testRemainingCost = screen.getByTestId("remaining-value");

      expect(testItemName).toBeInTheDocument();
      expect(testSpentCost).toBeInTheDocument();
      expect(testRemainingCost).toBeInTheDocument();
    });
});

describe("ExpenseItem", () => {
    test("should delete the expense item when delete button is clicked", () => {
      render(
        <App/>
      );

      const nameInput = screen.getByLabelText(/name/i);
      const costInput = screen.getByLabelText(/cost/i);

      fireEvent.change(nameInput, { target: { value: "Clothes" } });
      fireEvent.change(costInput, { target: { value: "100" } });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);

      const testItemName = screen.getByText("Clothes");
      expect(testItemName).toBeInTheDocument();

      const deleteButton = screen.getByText("x");
      fireEvent.click(deleteButton);

      expect(screen.queryByText("Clothes")).not.toBeInTheDocument();
      expect(screen.getByTestId("remaining-value")).toBeInTheDocument();
      expect(screen.getByTestId("budget-value")).toBeInTheDocument();
    });
});