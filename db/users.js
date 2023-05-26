const db = require("./dbConfig");

// Hae käyttäjä sähköpostiosoitteella
const getUserByEmail = (email, next) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  // Tehdään kysely tietokantaan joka palauttaa käyttäjän
  db.query(query, (err, result) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    } else {
      next(result.rows);
    }
  });
};

module.exports = { getUserByEmail };
