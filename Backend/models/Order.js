const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    userName:{
        type: String
    },
    item:{
        type: String,
        required: true
    },
    resname:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    payment:{
        type: String,
        default: "Pending"
    },
    address:{
        type: String,
        default: "Pending"
    },
    status:{
        type: String,
        default: "Pending"
    },
    rating:{
        type: String,
        default: "5"
    },
    contact:{
        type: String,
        default: "5"
    },
    lat:{
        type: Number,
        default: 33
    },
    long:{
        type: Number,
        default: 73
    },
    dpuser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dpuser',
        default: "374fg38497"
    }
    

});

module.exports = mongoose.model('orders', OrderSchema);