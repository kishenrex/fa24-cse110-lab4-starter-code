import React, { useState, useContext } from "react";
import {AppContext } from "../../context/AppContext"
import {v4 as uuidv4} from "uuid"
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [description, setDescription] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const new_id = uuidv4();
    try {
      await createExpense({id:new_id, cost:cost, description:description }); 
      setExpenses([...expenses, {id:new_id, description:description, cost:cost}]);
    } catch (error) {
      console.error("Failed to create expense", error);
    }
    
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="description">Description</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            value={description}
            // HINT: onChange={}
            onChange={(event) => setDescription(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            // HINT: onChange={}
            onChange={(event) => setCost(Number(event.target.value))}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
