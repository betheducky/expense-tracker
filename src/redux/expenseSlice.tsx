import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
    id: string;
    name: string;
    amount: number;
    description: string;
    dateModified: string;
  }

  interface ExpenseState {
    expenses: Expense[];
  }

  const initialState: ExpenseState = {
    expenses: [],
  }

  const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
        editExpense: (state, action: PayloadAction<Expense>) => {
            const expenseIndex = state.expenses.findIndex((expense) => expense.id === action.payload.id);
            if (expenseIndex !== -1) {
                state.expenses[expenseIndex] = {...state.expenses[expenseIndex], ...action.payload};
            };
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        },
        setExpenses: (state, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload;
        }
    }
  });

  export const {addExpense, editExpense, deleteExpense, setExpenses} = expenseSlice.actions;

  export default expenseSlice.reducer;