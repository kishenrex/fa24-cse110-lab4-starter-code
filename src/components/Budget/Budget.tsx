import { AppContext } from "../../context/AppContext";
import { useContext } from "react";



const Budget = () => {

  const { budget } = useContext(AppContext);

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: <span data-testid = "budget-value">${budget}</span></div>
    </div>
  );
};

export default Budget;
