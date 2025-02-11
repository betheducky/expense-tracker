import ExpenseList from "./components/ExpenseList";
import { GlobalStyles } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

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
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "0 1rem 3rem",
          margin: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", padding: "3rem 0 1rem" }}
        >
          Daily Expenses
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", paddingBottom: "1rem" }}
        >
          Enter an expense below to track and calculate your expenditures.
        </Typography>
        <ExpenseList></ExpenseList>
      </Box>{" "}
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        Created by devtodaydevtomorrow
      </Typography>
    </>
  );
}

export default App;
