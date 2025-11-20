const express = require('express');

const hostRouter = express.Router();
const homeController = require('../controllers/homeController');


hostRouter.get('/addhome',homeController.getAddhome);

hostRouter.post('/homeadded', homeController.postHomeadded);

exports.hostRouter = hostRouter;

