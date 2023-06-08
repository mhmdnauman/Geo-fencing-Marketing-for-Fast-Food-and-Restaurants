const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  
    
    username:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
    ,
    date:{
        type: Date,
        default: Date.now
    },
    profilePhoto:{
        type: String,
    },
    phoneNo:{
        type: String,
        required: true,
        unique: true
    },
    lat:{
        type: String
    },
    long:{
        type: String
    },
    address:{
        type: String
    }


});

module.exports = mongoose.model('user', UsersSchema);