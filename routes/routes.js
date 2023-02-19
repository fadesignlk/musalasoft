const express = require('express');
const Controller = require('../controllers/controllers')

const router = express.Router();

// GET all gateways and their associated devices
router.get('/gateways', Controller.getAllGateways);

// GET a single gateway and its associated devices
router.get('/gateways/:serialNumber', Controller.getSingleGateway);

// CREATE a Gateway
router.post('/gateways', Controller.createGateway);

// ADD a device to a gateway
router.post('/gateways/:serialNumber/devices', Controller.addDevice);

// DELETE a device from a gateway
router.delete('/gateways/:serialNumber/devices/:uid', Controller.removeDevice);

// DELETE a Gateway
router.delete('/gateways/:serialNumber', Controller.removeGateway)

module.exports = router