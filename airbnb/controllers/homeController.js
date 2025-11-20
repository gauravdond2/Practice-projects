const path = require('path');
const fs = require('fs');
const Home = require('../models/home');
const rootdir = require('../utils/utilpath');


exports.postHomeadded = (req, res) => {
    const body = req.body;
    const newHome = new Home(
        body.homeName,
        body.location,
        body.rating,
        body.photo,
        body.pricePerNight
    );
    newHome.save();
  // Logic to handle the addition of a new home would go here
  res.render("host/homeadded",{pageTitle: 'Home Added'});

};

exports.getHomePage = async  (req, res) => {
   Home.fetchAll((data) =>{
    return res.render('store/home',{pageTitle: 'airbnb Home',  registeredHomes:  data});
  });
  
};

exports.getAddhome =  (req, res) => {
  res.render('host/addHome',{pageTitle: 'Add New Home'});
}