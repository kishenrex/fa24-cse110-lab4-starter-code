import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { fetchBudget } from "../../utils/budget-utils";

const Budget = () => {

  const { budget, setBudget } = useContext(AppContext);

  // Fetch budget on component mount
  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
    try {
          const budgetAmount = await fetchBudget();
          console.log("budget amount is" + budgetAmount)
          setBudget(budgetAmount);
    } catch (err: any) {
          console.log(err.message);
    }
    };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: <span data-testid="budget-value">${budget}</span></div>
    </div>
  );
};

export default Budget;
