var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    lastName:String,
    firstName: String,
    email: String,
    lastLogin : Date,
    registerDate : Date

},
    {
        collection: 'users'
    
});

module.exports = mongoose.model('User', userSchema); 
