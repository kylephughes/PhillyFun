var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});

module.exports = mongoose.model('User', userSchema); 
//Now `require('Item.js')` will return a mongoose Model,
//without needing to do require('Item.js').Item