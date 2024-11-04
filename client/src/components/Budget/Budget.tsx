import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {

  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newBudget, setNewBudget] = useState<number>(budget);

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

    const handleEditClick = () => {
      setIsEditing(true);
      setNewBudget(budget);
    };

    const handleSaveClick = async () => {
      console.log("handleSaveClick called");
      try {
        const updatedBudget = await updateBudget(newBudget);
        setBudget(updatedBudget);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating budget", error);
      }
    };

    const handleCancelClick = () => {
      setIsEditing(false);
    };

    return (
      <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
        {isEditing ? (
          <div>
            <input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(Number(e.target.value))}
              className="form-control"
            />
            <button onClick={handleSaveClick} className="btn btn-primary mt-2">
              Save
            </button>
            <button onClick={handleCancelClick} className="btn btn-secondary mt-2 ml-2">
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <div>
              Budget: <span data-testid="budget-value">${budget}</span>
            </div>
            <button onClick={handleEditClick} className="btn btn-primary mt-2">
              Edit Budget
            </button>
          </div>
        )}
      </div>
    );
  };
export default Budget;
