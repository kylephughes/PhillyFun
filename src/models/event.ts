const mongoose = require('mongoose');

// Events have the title, the bar/resturant name, lat and long for google map, the type of event
//and a brief description of the event
export const eventSchema = new mongoose.Schema({
  title:    String,
  location: String,
  latitude: Number,
  longitude: Number,
  type: String,
  description:String
},
  { collection: 'event' }
);