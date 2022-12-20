const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // extraire le token du headers authorization
    const token = req.headers.authorization.split(" ")[1];
    // vérifier la validiter du token
    jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
      if (err) {
        // le token n'est pas valide
        res.status(401).json("unauthorized");
      } else {
        req.payload = payload;
        next();
      }
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
