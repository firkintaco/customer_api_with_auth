const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// DB functions
const {
  getAllCustomers,
  getCustomerById,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./controllers/customer");

// Routes
app.get("/api/customers", getAllCustomers);
app.get("/api/customers/:id", getCustomerById);
app.post("/api/customers/", addNewCustomer);
app.put("/api/customers/:id", updateCustomer);
app.delete("/api/customers/:id", deleteCustomer);

app.listen(3000, () => console.log("Server is up"));
