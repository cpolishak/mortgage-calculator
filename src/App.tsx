import "./App.css";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function App() {
  // const [monthlyPmt, setMonthlyPmt] = useState(0);
  const [loanAmt, setLoanAmt] = useState(150000);
  const [interest, setInterest] = useState(5.0);
  const [loanTerm, setLoanTerm] = useState(30);

  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [totalInterest, setTotalInterest] = useState("");

  const [selected, setSelected] = useState("monthly");

  // The formula for calculating the monthly payment is:
  // M = P(i(1+i)n)/((1+i)n - 1)

  // M: Monthly mortgage payment
  // P: Loan amount
  // i: Monthly interest rate (APR / 12)
  // n: Total number of payments (loan term in years x 12)

  const calcNumPayments = () => {
    // Get and convert input values.
    const loanAmount = loanAmt;
    const monthlyInterestRate = interest / 100 / 12;
    const loanTermInMonths = loanTerm * 12;

    // Calculate monthly mortgage payment.
    const monthlyPaymentAmount =
      (loanAmount * monthlyInterestRate) /
      (1 - 1 / Math.pow(1 + monthlyInterestRate, loanTermInMonths));
    const totalPayment = monthlyPaymentAmount * loanTermInMonths;

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    // Display monthly payment amount.
    setMonthlyPayment(currencyFormatter.format(monthlyPaymentAmount));

    // Display total payment amount.
    setTotalPayment(currencyFormatter.format(totalPayment));

    // Display total interest amount.
    setTotalInterest(currencyFormatter.format(totalPayment - loanAmount));
  };

  const handleClick = (button: string) => {
    setSelected(button);
  };

  const cardStyle = {
    px: 4,
    py: 1,
    width: "80%",
    backgroundColor: "rgb(245, 245, 245)",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "rgb(200, 225, 200)",
      }}
    >
      <Card sx={cardStyle}>
        <Typography variant="h3">Mortgage Calculator</Typography>
        <Typography variant="body2" sx={{ pb: 1 }}>
          Calculate basic mortgage payments
        </Typography>
        <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          sx={{ marginBottom: 2 }}
        >
          <Button
            variant={selected === "monthly" ? "contained" : "outlined"}
            onClick={() => handleClick("monthly")}
          >
            Monthly Payment
          </Button>
          <Button
            variant={selected === "all" ? "contained" : "outlined"}
            onClick={() => handleClick("all")}
          >
            Total Payments
          </Button>
        </ButtonGroup>

        <Paper elevation={3} style={{ padding: 12 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} sx={{ marginTop: 2 }}>
              <TextField
                error={!loanAmt || loanAmt === 0}
                type="number"
                label="Loan Amount"
                variant="outlined"
                sx={{
                  margin: 1,
                  width: "150px",
                }}
                value={loanAmt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setLoanAmt(Number(e.target.value));
                }}
              />
              <TextField
                error={!loanTerm || loanTerm === 0}
                type="number"
                label="Loan Term"
                variant="outlined"
                sx={{
                  margin: 1,
                  width: "150px",
                }}
                value={loanTerm}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setLoanTerm(Number(e.target.value));
                }}
              />

              <TextField
                error={!interest || interest === 0}
                type="number"
                label="Interest"
                variant="outlined"
                sx={{
                  margin: 1,
                  width: "150px",
                }}
                value={interest}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setInterest(Number(e.target.value));
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={5}
              sx={{ alignContent: "center", textAlign: "left" }}
            >
              <Typography sx={{ pb: 1, fontSize: "20px", fontWeight: 500 }}>
                Monthly Mortgage Payment:{" "}
                <span style={{ paddingLeft: 10, fontWeight: 400 }}>
                  {monthlyPayment}
                </span>
              </Typography>
              {selected === "all" ? (
                <div>
                  <Typography sx={{ pb: 1, fontSize: "20px", fontWeight: 500 }}>
                    Total Payment Amount:{" "}
                    <span style={{ paddingLeft: 10, fontWeight: 400 }}>
                      {totalPayment}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
                    Total Interest to be Paid:{" "}
                    <span style={{ paddingLeft: 10, fontWeight: 400 }}>
                      {totalInterest}
                    </span>
                  </Typography>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </Paper>

        <Button
          disabled={!loanAmt || !loanTerm || !interest}
          sx={{ my: 2 }}
          onClick={calcNumPayments}
          variant="contained"
        >
          Submit
        </Button>
      </Card>
    </Box>
  );
}

export default App;
