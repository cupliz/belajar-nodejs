var express = require('express');
var router = express.Router();

function fc1(req, res, next) {
  console.log(req.method)
  res.send('Halaman users')
}
module.exports = {
  fc1
};
