import { render, screen, fireEvent } from "@testing-library/react";
//import Budget from "./components/Budget/Budget";
import App from "./App"

describe("Budget Balance Verification", () => {
    test("checks initial setup is correct", () => {
      render(<App />);
   
      
      const initialBudget = screen.getByTestId('budget-value');
      const initialBudgetVal = initialBudget.textContent;

      const initialRemaining = screen.getByTestId('remaining-value');
      const initialRemainingVal = initialRemaining.textContent;

      const initialSpent = screen.getByTestId('spent-value');
      const initialSpentVal = initialSpent.textContent;

      expect(initialBudgetVal).toEqual("$5000");
      expect(initialRemainingVal).toEqual("$5000");
      expect(initialSpentVal).toEqual("$0");
    });


    test("checks budget equation is correct after adding 1 expense of $1000", () => {
      render(<App />);
      const createExpenseNameInput = screen.getByLabelText("Name");
      const createExpenseCostInput = screen.getByLabelText("Cost");
      const saveButton = screen.getByText("Save");

      fireEvent.change(createExpenseNameInput, { target: { value: "Phone" } });
      fireEvent.change(createExpenseCostInput, { target: { value: 1000 } });
      fireEvent.click(saveButton);

      const afterBudget = screen.getByTestId('budget-value');
      const afterBudgetVal = afterBudget.textContent;

      const afterRemaining = screen.getByTestId('remaining-value');
      const afterRemainingVal = afterRemaining.textContent;

      const afterSpent = screen.getByTestId('spent-value');
      const afterSpentVal = afterSpent.textContent;

      expect(afterBudgetVal).toEqual("$5000");
      expect(afterRemainingVal).toEqual("$4000");
      expect(afterSpentVal).toEqual("$1000");

    });

    test("adds expense then removes it", () => {
      render(<App />);
      const createExpenseNameInput = screen.getByLabelText("Name");
      const createExpenseCostInput = screen.getByLabelText("Cost");
      const saveButton = screen.getByText("Save");

      fireEvent.change(createExpenseNameInput, { target: { value: "Phone" } });
      fireEvent.change(createExpenseCostInput, { target: { value: 1000 } });
      fireEvent.click(saveButton);

      const deleteButton = screen.getByText("x");
      fireEvent.click(deleteButton);

      const afterBudget = screen.getByTestId('budget-value');
      const afterBudgetVal = afterBudget.textContent;

      const afterRemaining = screen.getByTestId('remaining-value');
      const afterRemainingVal = afterRemaining.textContent;

      const afterSpent = screen.getByTestId('spent-value');
      const afterSpentVal = afterSpent.textContent;

      expect(afterBudgetVal).toEqual("$5000");
      expect(afterRemainingVal).toEqual("$5000");
      expect(afterSpentVal).toEqual("$0");

    });

    test("adds expense that goes over budget", () => {
      render(<App />);
      const createExpenseNameInput = screen.getByLabelText("Name");
      const createExpenseCostInput = screen.getByLabelText("Cost");
      const saveButton = screen.getByText("Save");

      fireEvent.change(createExpenseNameInput, { target: { value: "Phone" } });
      fireEvent.change(createExpenseCostInput, { target: { value: 6000 } });
      fireEvent.click(saveButton);

      const afterBudget = screen.getByTestId('budget-value');
      const afterBudgetVal = afterBudget.textContent;

      const afterRemaining = screen.getByTestId('remaining-value');
      const afterRemainingVal = afterRemaining.textContent;

      const afterSpent = screen.getByTestId('spent-value');
      const afterSpentVal = afterSpent.textContent;

      expect(afterBudgetVal).toEqual("$5000");
      expect(afterRemainingVal).toEqual("$-1000");
      expect(afterSpentVal).toEqual("$6000");

    });
   });