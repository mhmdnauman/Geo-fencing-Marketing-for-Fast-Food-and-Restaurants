const express = require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchUser");
const Order = require("../models/Order");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const Items = require("../models/Items");

//Get all current user orders using GET "/api/v1/auth/fetchOrders"

router.post("/fetchOrdersbyUser", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.body.userid });
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

//Get all current user orders using GET "/api/v1/auth/fetchOrders"



router.post("/fetchOrdersforRating", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.body.user, status: "Completed"});
    let itemname = orders[orders.length-1].item;
    const item = await Items.find({ title: itemname});
    res.json(item[item.length-1]);
    console.log(item[item.length-1]);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

router.post("/LastOrderforRating", async (req, res) => {
  try {
    const item = await Items.findById(req.body.ID);
    console.log(req.body.ID);
    res.json(item.title);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});


router.post("/fetchAllOrders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});


router.post("/fetchAllPendingOrders", async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending"});
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});


router.post("/AcceptOrder", async (req, res) => {
  try {
    const orders = await Order.findByIdAndUpdate(req.body.orderId, {$set: {dpuser: req.body.dpuserid, status: "Accepted"}}, { new: true });   
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});


router.post("/RejectOrder", async (req, res) => {
  try {
    const orders = await Order.findByIdAndDelete(req.body.orderId);   
    res.json("Deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

router.post("/CompleteOrder", async (req, res) => {
  try {
    const orders = await Order.findByIdAndUpdate(req.body.orderId,{$set: {status: "Completed"}}, { new: true });   
    res.json("Deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});


router.post("/ActiveOrders", async (req, res) => {
  try {
    const orders = await Order.find({dpuser: req.body.dpuserid, status: "Accepted"});
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

router.post("/TrackOrders", async (req, res) => {
  try {
    const orders = await Order.find({user: req.body.userid});
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});



router.get("/fetchOrders", async (req, res) => {
  try {
    const orders = await Order.findById({user: req.userid});
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

//Place a new order using POST "/api/v1/auth/placeOrders"

router.post(
  "/placeOrders",
  [body("quantity", "Quantity cannot be zero").isInt({ min: 1 })],
  async (req, res) => {
    try {
      let { user, userName, item, resname, quantity, price, payment, address, status, rating, contact, lat, long, dpuser } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      price = price*quantity;

      const fetchuser = await User.findById(user).select("-password");
      fetcheduserName = fetchuser.name;

      const order = new Order({
        user,
        userName: fetcheduserName,
        item,
        resname,
        quantity,
        price, 
        payment, 
        address, 
        status, 
        rating, 
        contact, 
        lat, 
        long,
        dpuser
      });

      const placedOrder = await order.save();

      res.json(placedOrder);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

module.exports = router;
