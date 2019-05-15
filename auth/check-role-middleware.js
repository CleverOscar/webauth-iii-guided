module.exports = role => {
  return(req, res, next){
    if(req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({message: "you are not allowed!"})
    }
  }
}
