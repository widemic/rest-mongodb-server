const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SensorData = new Schema({
    _id: {
      type: String
    },
    messageTime: {
      type: String
    },
    node: {
      type: String
    },
    temp: {
      type: Number
    },
    hum: {
      type: Number
    },
    press: {
      type: Number
    },
    O3: {
      type: Number
    },
    NO: {
      type: Number
    },
    NO2: {
      type: Number
    },
    CO: {
      type: Number
    },
    SO2: {
      type: Number
    },
    CO2: {
      type: Number
    },
    batt: {
      type: Number
    }
  
  },{
      collection: 'message'
  });
  
  module.exports = mongoose.model('SensorData', SensorData);
