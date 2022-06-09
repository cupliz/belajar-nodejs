require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_CONNECTION_STRING,
})

const { auth } = require('./helpers');
const index = require('./routes/index');
const actors = require('./routes/actors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/actors', actors.get)
app.get('/film-terbaik', actors.filmTerbaik)

app.use('*', (req, res, next) => {
  res.status(404).json('Not Found')
})

module.exports = app;
