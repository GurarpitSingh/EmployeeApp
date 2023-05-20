const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

require("./DB/db");

// Using Cors and Express
app.use(express.json());
app.use(cors());

// Redirection to routes
app.use("/employees", require("./routes/EmployeeRoutes"))


app.listen(3000, () => console.log("Server started on port 3000"));
