import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  const remaining = budget - totalExpenses

  useEffect(() => {
    if (remaining < 0) {
      window.alert("Error: You have exceeded your budget!")
    }
  }, [remaining])
  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: <span data-testid = "remaining-value">${remaining}</span></span>
    </div>
  );
};

export default Remaining;
