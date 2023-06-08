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
        type: Number,
        required: true,
        unique: true
    },
    location:{
        type: Number
    }


});

module.exports = mongoose.model('userdp', UsersSchema);