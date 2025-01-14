const fs = require("fs").promises; // using fs.promise to perfrom file operations

const express = require("express");
const app = express();
const cors = require("cors"); // Import the CORS middleware
const port = 3001;

// Enable CORS for all origins
app.use(cors());

app.listen(port, () => {
  console.log(`server listen at http://localhost:${port}`);
});

const fetchTransactionData = async () => {
  try {
    const data = await fs.readFile("./data/customers.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(+error.message);
  }
};

//setup endpoint to server
app.get("/api/transactions", async (req, res) => {
  try {
    const transactionData = await fetchTransactionData();
    res.status(200).json(transactionData); // return json response
  } catch (error) {
    res.status(500).json({ error: "somthing went wrong fetching Data" });
  }
});
