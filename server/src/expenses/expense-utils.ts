import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 }

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function
    //const { id } = req.params;
    // console.log("request params is " + req.params);
    // console.log("request method is " + req.method);
    // console.log("request body is " + req.body);

    try {
        // Type casting the request body to the expected format.
        const { id } = req.params as { id: string };
 
        if (!id ) {
            console.log(id);
            console.log(JSON.stringify(req.params));
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        const expense = await db.get('SELECT * FROM expenses WHERE id = ?;',[id])

        if (!expense) {
            return res.status(404).send({ error: 'Expense could not be found' });
        }

        await db.run('DELETE FROM expenses WHERE id = ?;', [id]);
        res.status(200).send({ id });
 
    } catch (error) {
        return res.status(500).send({ error: `Expense could not be deleted, + ${error}` });
    };

    // const index = expenses.findIndex(expense => expense.id === id);
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all('SELECT * FROM expenses')
        res.status(200).send({ "data": expenses });
        
    } catch (error) {
        return res.status(404).send({ error: `Expense could not be found, + ${error}` });
    }
}