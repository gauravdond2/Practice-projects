const express = require('express');

const hostRouter = express.Router();

hostRouter.get('/addhome', (req, res) => {
  res.render('addHome',{pageTitle: 'Add New Home'});
});

const registeredHomes = [];
hostRouter.post('/homeadded', (req, res) => {
    const body = req.body;
    registeredHomes.push(body);
  // Logic to handle the addition of a new home would go here
  res.render("homeadded",{pageTitle: 'Home Added'});

});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;

