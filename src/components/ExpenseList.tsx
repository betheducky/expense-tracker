import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useState } from "react";

interface Expense {
  id: number;
  name: string;
  amount: number;
  description: string;
  dateModified: string;
}

function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseLastModified, setExpenseLastModified] = useState("");

  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount) {
      alert("'Name' and 'Amount' fields cannot be blank!");
      return;
    }
    const newExpense: Expense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(String(expenseAmount)),
      description: expenseDescription || "-",
      dateModified: Date.now().toLocaleString(),
    };
    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setExpenseAmount("");
    setExpenseDescription("");
  };

  const handleEditExpense = (
    id?: number,
    updatedName?: string,
    updatedAmount?: number,
    updatedDescription?: string
  ) => {
    const editedExpenses = expenses.map((expense) =>
      expense.id === id
        ? {
            ...expense,
            name: updatedName ?? expense.name,
            amount: updatedAmount ?? expense.amount,
            description: updatedDescription ?? expense.description,
          }
        : expense
    );
    setExpenses(editedExpenses);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleClearFields = () => {
    setExpenseName("");
    setExpenseAmount("");
    setExpenseDescription("");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "1.5rem",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ paddingTop: "15px", fontWeight: "500" }}
        >
          New Expense:
        </Typography>
        <TextField
          type="text"
          size="small"
          id="new-expense"
          label="Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          variant="standard"
          sx={{ margin: "0 .25rem;" }}
        />
        <TextField
          type="number"
          size="small"
          id="new-expense"
          label="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          variant="standard"
          sx={{ margin: "0 .25rem" }}
        />
        <TextField
          type="text"
          size="small"
          id="new-expense"
          label="Description"
          value={expenseDescription}
          onChange={(e) => setExpenseDescription(e.target.value)}
          variant="standard"
          sx={{ width: "30%", margin: "0 .25rem" }}
        />
        <Button size="small" variant="contained" onClick={handleAddExpense}>
          Add
        </Button>
        <Button size="small" variant="outlined" onClick={handleClearFields}>
          Clear
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="Current Expenses">
          <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
            <TableRow>
              <TableCell>I.D.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.dateModified}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleEditExpense}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteExpense(expense.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!expenses.length && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", padding: "50px" }}
          >
            No expenses added, yet!
          </Typography>
        </>
      )}
    </>
  );
}

export default ExpenseList;
