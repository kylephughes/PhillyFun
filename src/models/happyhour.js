var mongoose = require('mongoose');

// Events have the title, the bar/resturant name, lat and long for google map, the type of event
//and a brief description of the event
var hhSchema = new mongoose.Schema({
 
  name: String,
  latitude: Number,
  longitude: Number,
  formattedAddress: String,
  created_date: {
    type: Date,
    default: Date.now
  },
  monSpecials: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    specials: [{
      itemName: String
    }]
  },
  tueSpecials: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    specials: [{
      itemName: String
    }]
  },
  wedSpecials: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    specials: [{
      itemName: String
    }]
  },
  thrSpecials: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    specials: [{
      itemName: String
    }]
  },
  friSpecials: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    specials: [{
      itemName: String
    }]
  },
  satSpecials: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    specials: [{
      itemName: String
    }]
  },
  sunSpecials: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    specials: [{
      itemName: String
    }]
  }
}, {
  collection: 'happyhour'
});

module.exports = mongoose.model('HappyHour', hhSchema);
