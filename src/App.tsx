import ExpenseList from "./components/ExpenseList";
import {GlobalStyles} from "@mui/material";
import { Typography } from "@mui/material";
import {Box} from "@mui/material";

function App() {
  return (
    <>
    <GlobalStyles 
    styles={{
      ".uniform-cell": {
        width: "9rem",
      },
    }}
    />
    <Box sx={{padding: '10rem', marginTop: '3rem',}}>
      <Typography variant="h4" sx={{textAlign: 'center', paddingBottom: '1rem'}}>Daily Expenses</Typography>
      <Typography variant="h6" sx={{textAlign: 'center', paddingBottom: '1rem'}}>Enter an expense below to track and calculate your expenditures.</Typography>
      <ExpenseList></ExpenseList>
    </Box>
    </>
  );
}

export default App;
