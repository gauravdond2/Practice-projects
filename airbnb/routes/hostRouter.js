const express = require('express');

const hostRouter = express.Router();
const homeController = require('../controllers/homeController');


hostRouter.get('/addhome',homeController.getEditHome);

hostRouter.post('/homeadded', homeController.postHomeadded);
hostRouter.get('/hostHomes', homeController.getHomes);
hostRouter.get('/editHome/:id', homeController.getEditHome)
hostRouter.post('/editHome', homeController.postEditHome);
hostRouter.get('/deleteHome/:id',homeController.deleteHome)

exports.hostRouter = hostRouter;

