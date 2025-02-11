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
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";

import { TextField } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addExpense, editExpense, deleteExpense } from "../redux/expenseSlice";

interface Expense {
  id: string;
  name: string;
  amount: number;
  description: string;
  dateModified: string;
}

function ExpenseList() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [editedExpense, setEditedExpense] = useState<Partial<Expense>>({});

  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch();

  const formatId = (str: string) => {
    return str.slice(0, 5);
  };

  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount) {
      alert("'Name' and 'Amount' fields cannot be blank!");
      return;
    }

    const newId = uuidv4();
    const newExpense: Expense = {
      id: formatId(newId),
      name: expenseName,
      amount: parseFloat(String(expenseAmount)),
      description: expenseDescription || "-",
      dateModified: String(Date.now()),
    };
    dispatch(addExpense(newExpense));
    setExpenseName("");
    setExpenseAmount("");
    setExpenseDescription("");
  };

  const handleEditClick = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleSaveExpense = (id: string) => {

    if (!editedExpense.name || !editedExpense.amount) {
      alert("'Name' and 'Amount' fields cannot be blank!");
      return;
    }

  const updatedExpense: Expense = {
    id: id,
    name: editedExpense.name,
    amount: editedExpense.amount,
    description: editedExpense.description || "-",
    dateModified: String(Date.now())
  }

    dispatch(editExpense(updatedExpense));
    setEditingExpenseId(null);
    setEditedExpense({});
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
    setEditedExpense({});
  };

  const handleDeleteExpense = (id: string) => {
    dispatch(deleteExpense(id));
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
              <TableCell>Date Modified</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense: Expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                {editingExpenseId === expense.id ? (
                  <>
                    <TableCell className="uniform-cell">
                      <TextField
                        type="text"
                        size="small"
                        value={editedExpense.name || ""}
                        onChange={(e) =>
                          setEditedExpense((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell className="uniform-cell">
                      <TextField
                        type="number"
                        size="small"
                        value={editedExpense.amount || ""}
                        onChange={(e) =>
                          setEditedExpense((prev) => ({
                            ...prev,
                            amount: parseFloat(e.target.value),
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell className="uniform-cell">
                      <TextField
                        type="text"
                        size="small"
                        value={editedExpense.description || ""}
                        onChange={(e) =>
                          setEditedExpense((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell className="uniform-cell">
                      <TextField
                        disabled
                        size="small"
                        value={""}
                        onChange={() =>
                          setEditedExpense((prev) => ({
                            ...prev,
                            dateModified: String(Date.now()),
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={handleCancelEdit}>
                        <ClearIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleSaveExpense(expense.id);
                        }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="uniform-cell">
                      {expense.name}
                    </TableCell>
                    <TableCell className="uniform-cell">
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="uniform-cell">
                      {expense.description}
                    </TableCell>
                    <TableCell className="uniform-cell">
                      {expense.dateModified}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditClick(expense)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </>
                )}
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
