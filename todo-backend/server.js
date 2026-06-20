const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorHandler");


const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});