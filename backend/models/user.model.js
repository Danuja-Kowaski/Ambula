//Modal for user
const mongoose = require('mongoose');
const FoodInfo = require('./foodinfo.model')
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true,
        trim: true,
    },
    password : {
        type: String,
        required : true,
    },
    email : {
        type : String
    },
    user_type : {
        type: String
    },
    food_info: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodInfo'
      }],
})

const User = mongoose.model('User', userSchema);
module.exports = User;