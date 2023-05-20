const mongoose = require("mongoose");
require('dotenv').config()
mongoose
  .connect(
    process.env.MongoDB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));
