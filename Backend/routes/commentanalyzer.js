const express = require("express");
const router = express.Router();
const Restaurants = require("../models/restaurants");
const Items = require("../models/Items");
const Sentiment = require('sentiment');


router.post('/analyze-comment', async (req, res) => {
    try {
        const { comment } = req.body;
        let rating = getRating(comment);
        const rate = await Items.findById(req.body.ItemId);
        
        let newReview = {
          Reviews : []
        };
        newReview.Reviews.push(comment);
    
    //    const review = await Items.findByIdAndUpdate(req.ItemId, {$push: {Reviews: comment}}, {new: true});

        const addreview = await Items.findByIdAndUpdate(req.body.ItemId, {$push: {Reviews: comment}}, { new: true });
       

        let lastcount = rate.NoOfReviews;
        lastcount++;
        const rated = await Items.findByIdAndUpdate(req.body.ItemId, {$set: {NoOfReviews: lastcount}}, { new: true });
        let TotalRating = rate.TotalRating;
        TotalRating = TotalRating + rating;
        const totalrating = await Items.findByIdAndUpdate(req.body.ItemId, {$set: {TotalRating: TotalRating}}, { new: true }); 
        lastrating = rate.rating;
        if(lastrating!==0){
        const NoOfR = await Items.findById(req.body.ItemId);
        rating=NoOfR.TotalRating/NoOfR.NoOfReviews;
        rating = rating.toFixed(2);
        }
        const items = await Items.findByIdAndUpdate(req.body.ItemId, {$set: {rating: rating}}, { new: true });   
        
        const update = await Items.findById(req.body.ItemId);
        
        res.json(update);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' + error });
      }

  });


  function getRating(comment) {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(comment);
    const rating = Math.ceil((result.score + 5) / 2);
    return rating;
  }



module.exports = router;
