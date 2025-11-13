const express = require('express');
const {registeredHomes} = require('./hostRouter');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.render('home',{pageTitle: 'airbnb Home',registeredHomes: registeredHomes});
});

module.exports = userRouter;