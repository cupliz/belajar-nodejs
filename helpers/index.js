const auth = function (req, res, next) {
  if (req.headers.authorization) {
    next()
  }else{
    res.send(403)
  }
}
module.exports = {
  auth
}