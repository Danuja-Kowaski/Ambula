//Modal for user
const mongoose = require('mongoose');
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
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;