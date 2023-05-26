const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const { login, authenticate } = require("./services/authentication");

app.use(bodyParser.json());

// DB functions
const {
  getAllCustomers,
  getCustomerById,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./controllers/customer");

// Routes for auth
app.post("/login", login);

// Routes
app.get("/api/customers", authenticate, getAllCustomers);
app.get("/api/customers/:id", authenticate, getCustomerById);
app.post("/api/customers/", authenticate, addNewCustomer);
app.put("/api/customers/:id", authenticate, updateCustomer);
app.delete("/api/customers/:id", authenticate, deleteCustomer);

app.listen(3000, () => console.log("Server is up"));

module.exports = app;
