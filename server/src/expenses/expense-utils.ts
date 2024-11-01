import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const { id } = req.params;
    console.log("request params is " + req.params);
    console.log("request method is " + req.method);
    console.log("request body is " + req.body);


    if (!id ) {
        console.log("reached !id")
        return res.status(400).send({ error: "Missing required fields" });
    }

    const index = expenses.findIndex(expense => expense.id === id);

    if (index !== -1) {
        console.log("index is found");
        expenses.splice(index, 1);
        res.status(200).send({ message: "Expense deleted succesfully"});
        console.log("expenses array is " + JSON.stringify(expenses));
    } else {
        console.log("index is not found");
        res.status(404).send({ message: "Expense not found"});
    }
    
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}