const db = require("../db/dbConfig");

// Get all movies
const getAllCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (error, result) => {
    if (error) {
      console.error(error);
    } else {
      res.json(result.rows);
    }
  });
};

// Get customer by id
const getCustomerById = (req, res) => {
  const query = {
    text: "SELECT * FROM customers WHERE id = $1",
    values: [req.params.id],
  };

  // Run query
  db.query(query, (error, result) => {
    if (error) {
      return console.error("Error excuting query", error.stack);
    } else {
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).end();
      }
    }
  });
};

// Add new customer
const addNewCustomer = (req, res) => {
  // Otetaan req.body:stä firstName, lastName, email, phone
  const { firstName, lastName, email, phone } = req.body;
  // Muodostetaan kysely
  const query = {
    text: "INSERT INTO customers (firstName, lastName, email, phone) VALUES ($1,$2,$3, $4)",
    values: [firstName, lastName, email, phone],
  };
  db.query(query, (error, result) => {
    if (error) {
      return console.error("Error excuting query", error.stack);
    }
  });
  res.json({ firstName, lastName, email, phone });
};
// Update customer by id
const updateCustomer = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone } = req.body;

  // Muodostetaan kysely
  const query = {
    text: "UPDATE customers SET firstName=$1, lastName=$2, email=$3, phone=$4 WHERE id = $5",
    values: [firstName, lastName, email, phone, id],
  };
  db.query(query, (err, res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
  res.json({ id, firstName, lastName, email, phone });
};

// Delete movie by id
const deleteCustomer = (req, res) => {
  const { id } = req.params;
  const query = {
    text: "DELETE FROM customers WHERE id = $1",
    values: [id],
  };

  // Tehdään kysely
  db.query(query, (error, result) => {
    if (error) {
      return console.error("Error excuting query", error.stack);
    }
  });
  res.status(204).end();
};

// Delete all movies, only for testing
const deleteAllCustomers = () => {
  db.query("DELETE FROM customers", (err, res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addNewCustomer,
  deleteCustomer,
  updateCustomer,
  deleteAllCustomers,
};
