const express = require('express');
const {registeredHomes} = require('./hostRouter');

const userRouter = express.Router();
const homeController = require('../controllers/homeController');

userRouter.get('/', homeController.getHomePage);

module.exports = userRouter;