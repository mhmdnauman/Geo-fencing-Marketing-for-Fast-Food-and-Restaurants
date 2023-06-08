const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemsSchema = new Schema({
  
    
    title:{
        type: String,
        unique: false
    },
    price:{
        type: Number
    },
    image:{
        type: String
    },
    description:{
        type: String
    },
    resname:{
        type: String
    },
    rating:{
        type: Number,
        default: 0
    },
    NoOfReviews:{
        type: Number,
        default: 0
    },
    Reviews:{
        type: [String]
    },
    TotalRating:{
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Invent', ItemsSchema);