const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantsSchema = new Schema({
  
    
    name:{
        type: String,
        unique: true
    },
    type:{
        type: String
    },
    rating:{
        type: Number
    },
    location:{
        type: String
    },
    logo:{
        type: String
    },
    location:{
        type: Array
    },
    lat:{
        type: String
    },
    long:{
        type: String
    }

});

module.exports = mongoose.model('restaurants', RestaurantsSchema);