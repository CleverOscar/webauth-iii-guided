const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  // tokens are commonly sent as the authorization header
  const token = req.headers.authorization;

  if(token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err){
        //the token is not valid
        res.status(401).json({ message: "Forbidden!"});
      } else {
        // the token is valid
        req.decodedJwt = decodedToken; // make it available to the rest of our API
        console.log('decoded token', req.decodedJwt);

        next();
      }
    })
  } else {
    // no token ? bounced out!
    res.status(401).json({ message: "You shall not pass!"})
  }
};
