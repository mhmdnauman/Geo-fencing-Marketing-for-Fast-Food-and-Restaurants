const express = require("express");
const router = express.Router();
const Order = require("../models/restaurants");
const Restaurants = require("../models/restaurants");

//Get all current restaurants using GET "/api/v1/auth/fetchOrders"

router.get("/fetchrestaurants", async (req, res) => {
  try {
    const restaurants = await Restaurants.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

router.get("/fetchrestaurantsloc", async (req, res) => {
  try {
    const restaurantsLoc = await Restaurants.findOne();
    res.json(restaurantsLoc.location);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});


//Place a new restaurant using POST "/api/v1/auth/placeOrders"

router.post(
  "/addRestaurants",
  async (req, res) => {
    try {
      let { Name, Type, Rating, Location, Logo } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const restaurant = new Restaurants({
        Name, 
        Type, 
        Rating, 
        Location, 
        Logo
      });

      const addedRestaurant = await restaurant.save();

      res.json(addedRestaurant);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

module.exports = router;
