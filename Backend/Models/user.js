const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true
    },
    "readList":[{
        type:mongoose.Schema.ObjectId,
        ref:"Blog"
    }],
    "readListLength":{
        type:Number,
        default:0
    },
    "resetPasswordToken":String,
    "resetPasswordExpire":Date
});


module.exports = mongoose.model('User', userSchema);

