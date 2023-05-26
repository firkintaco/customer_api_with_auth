const jwt = require("jsonwebtoken");
const user = require("../db/users");
const bcrypt = require("bcrypt");

// Kirjautuminen
const login = (req, res) => {
  // Sähköposti ja salasana req.body:stä
  const { email, password } = req.body;

  const loginUser = user.getUserByEmail(email, (user) => {
    if (user.length > 0) {
      const hashpwd = user[0].password;
      // Luodaan JSON web token
      const token = jwt.sign({ userId: email }, process.env.SECRET_KEY);

      // Jos salasana täsmää lähetetään tokeni
      if (bcrypt.compareSync(password, hashpwd)) {
        res.send({ token });
      } else {
        res.sendStatus(400).end();
      }
    } else {
      res.sendStatus(400).end();
    }
  });
};

// Käyttäjän vahvistus
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.sendStatus(400).end();
  }

  // Vahvistetaan tokeni
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.sendStatus(400).end();
    } else {
      next();
    }
  });
};
module.exports = { login, authenticate };
