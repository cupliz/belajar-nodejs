require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     port : 3306,
//     user : 'postgres',
//     password : '',
//     database : 'test'
//   }
// });

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DB_CONNECTION_STRING,
})

const { auth } = require('./helpers');
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res, next) => {
  const getUsers = await knex('users')
  console.log(getUsers)
  res.json(getUsers)
})
app.get('/izul', auth, index.fc1)
app.use('/users', auth, users.fc1);

app.use('*', (req, res, next) => {
  res.status(404).json('Not Found')
})

module.exports = app;
