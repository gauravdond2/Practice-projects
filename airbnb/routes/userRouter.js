const express = require('express');
const {registeredHomes} = require('./hostRouter');

const userRouter = express.Router();
const homeController = require('../controllers/homeController');

userRouter.get('/', homeController.getHomePage);
userRouter.get("/homes/:id",homeController.getHomeDetails);
userRouter.post("/addFavouriteHome",homeController.addtoFavourite);
userRouter.get("/favourites",homeController.getFavouritesPage);
userRouter.get("/romovehome/:id",homeController.removeHomeFromFavourites);

module.exports = userRouter;