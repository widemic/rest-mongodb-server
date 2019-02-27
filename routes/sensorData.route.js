const express = require('express');
const app = express();
const SensorDataRoute = express.Router();

let SensorData = require('../models/sensorData.model');
let SensorLocation = require('../models/sensorLocation.model');

// Get all sensor messages
SensorDataRoute.route('/').get(function (req, res) {
    SensorData.find(function (err, allSensorData) {
        if (err) {
            console.log(err);
        } else {
            res.json(allSensorData);
        }
    })
})

// Get just sensor messages from specific node
SensorDataRoute.route('/node/:address').get(function (req, res) {
    let address = req.params.address;
    SensorData.find({ 'node': address }).exec(function (err, nodeSensorData) {
        if (err) {
            console.log(err);
        } else {
            res.json(nodeSensorData);
        }
    })
})

// Get last message from specific node
SensorDataRoute.route('/node/:address/last').get(function (req, res) {
    let address = req.params.address;
    SensorData.find({ 'node': address }).limit(1).sort({ $natural: -1 }).exec(function (err, lastNodeSensorData) {
        if (err) {
            console.log(err);
        } else {
            res.json(lastNodeSensorData);
        }
    })
})

// Get last "n" messages fron specific node
SensorDataRoute.route('/node/:address/limit/:lim').get(function (req, res) {
    let address = req.params.address;
    let lim = req.params.lim;
    SensorData.find({ 'node': address }).limit(parseInt(lim)).sort({ $natural: -1 }).exec(function (err, lastNodeNumberSensorData) {
        if (err) {
            console.log(err);
        } else {
            res.json(lastNodeNumberSensorData);
        }
    })
})

// Get last message from DB
SensorDataRoute.route('/last').get(function (req, res) {
    SensorData.find({}).limit(1).sort({ $natural: -1 }).exec(function (err, lastSensorData) {
        if (err) {
            console.log(err);
        } else {
            res.json(lastSensorData);
        }
    })
})

// Get last "n" messages from DB
SensorDataRoute.route('/limit/:lim').get(function (req, res) {
    let lim = req.params.lim;
    SensorData.find({}).limit(parseInt(lim)).sort({ $natural: -1 }).exec(function (err, lastNumberSensorData) {
        if (err) {
            console.log(err);
        } else {
            res.json(lastNumberSensorData)
        }
    })
})

// Get location from all nodes
SensorDataRoute.route('/location').get(function (req, res) {
    SensorLocation.find({}).exec(function (err, nodesLocations) {
        if (err) {
            console.log(err);
        } else {
            res.json(nodesLocations);
        }
    })
})

// Add location to node address
SensorDataRoute.route('/location/add').post(function (req, res) {
    SensorLocation.find({ 'node': req.query.node }).exec(function (err, obiect) {
        if (err) {
            console.log(err);
        } else {
            let maplocation = new SensorLocation(req.query);
            maplocation.save()
                .then(game => {
                    res.status(200).json({ 'SensorLocation': 'Sensor location added successfully' });
                })
                .catch(err => {
                    res.status(400).send({ 'SensorLocation': 'Unable to save to DB, duplicate conflict' });
                });
        }
    })


})



module.exports = SensorDataRoute;