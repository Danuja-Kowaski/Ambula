//Modal for Food information
const mongoose = require('mongoose');
const User = require('./user.model')
const infoSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    info_name : {
        type: String,
        required : true,
    },
    diet_type : {
        type: String,
        required : true,
    },
    cuisine_name : {
        type : String
    }
})

const FoodInfo = mongoose.model('FoodInfo', infoSchema);
module.exports = FoodInfo;