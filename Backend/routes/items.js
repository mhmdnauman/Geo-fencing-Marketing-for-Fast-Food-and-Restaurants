const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
const Order = require("../models/Order");

//Get all current items using GET "/api/v1/auth/fetchOrders"

router.get("/fetchitems", async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});


router.get("/fetchOrders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

module.exports = router;