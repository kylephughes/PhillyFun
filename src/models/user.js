var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    fullName: String,
    email: String,

},
    {
        collection: 'users'
    
});

module.exports = mongoose.model('User', userSchema); 
