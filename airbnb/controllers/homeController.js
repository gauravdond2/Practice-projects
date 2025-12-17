const path = require('path');
const fs = require('fs');
const Home = require('../models/home');
const rootdir = require('../utils/utilpath');
const Favourites = require('../models/favourites')


exports.postHomeadded = (req, res) => {
    const body = req.body;
    const newHome = new Home(
        body.homeName,
        body.location,
        body.rating,
        body.photo,
        body.pricePerNight
    );
    newHome.id = Date.now().toString();
    newHome.save();
  // Logic to handle the addition of a new home would go here
  res.render("host/homeadded",{pageTitle: 'Home Added'});

};

exports.getHomePage = async  (req, res) => {
   Home.fetchAll((data) =>{
    return res.render('store/index',{pageTitle: 'airbnb Home',  registeredHomes:  data});
  });
  
};

exports.getAddhome =  (req, res) => {
  res.render('host/addHome',{pageTitle: 'Add New Home'});
}

exports.getHomeDetails = (req, res) => {
  const id = req.params.id;
  Home.fetchById(id,(home)=>{
    if(!home){
      return res.status(404).render('404',{pageTitle: 'Home Not Found'});
    }else{
      res.render('store/home-details',{pageTitle: 'Home Details', home: home});
    }
  })
}

exports.addtoFavourite =  (req,res) =>{
   Favourites.save(req.body.id,() => {
     Favourites.fetchFavouriteHomes((favHomes) =>{
    res.render('store/favourite-homes',{pageTitle: "Favourite homes",homes:favHomes});
  })

   } );
 
}

exports.getFavouritesPage = (req,res) =>{
    Favourites.fetchFavouriteHomes((homes) =>{
      res.render('store/favourite-homes',{pageTitle:"Favourite Homes", homes:homes});
    })
}