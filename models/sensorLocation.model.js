const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let SensorLocation = new Schema({
//   _id: {
//     type: String
//   },
//   messageTime: {
//     type: Date
//   },
  node: {
    type: String,
    unique: true
  },
  lattitude: {
    type: String
  },
  longitude: {
    type: String
  }

},{
    collection: 'location'
});

module.exports = mongoose.model('SensorLocation', SensorLocation);
