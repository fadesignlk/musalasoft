const { Gateway, PeripheralDevice } = require('../models/models');

module.exports = {
    homeInfo: async(req, res) => {
        try {
            res.send('Add /gateways at the end of the url to get all the gateway details')
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    createGateway: async(req, res) => {
        try {
            const gateway = new Gateway(req.body);
            const result = await gateway.save();
            res.send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    addDevice: async(req, res)=>{
        try {
            const gateway = await Gateway.findOne({ serialNumber: req.params.serialNumber });
            if (!gateway) {
            return res.status(404).send('Gateway not found');
            }
            const device = new PeripheralDevice(req.body);
            gateway.devices.push(device);
            const result = await gateway.save();
            res.send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getAllGateways: async(req, res)=>{
        Gateway.find({}, (err, gateways) => {
            if (err) {
            console.log(err);
            res.status(500).send(err);
            } else {
            res.send(gateways);
            }
        });
    },
    getSingleGateway: async(req, res)=>{
        Gateway.findOne({ serialNumber: req.params.serialNumber }, (err, gateway) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else if (!gateway) {
              res.status(404).send('Gateway not found.');
            } else {
              res.send(gateway);
            }
        });
    },
    removeDevice: async(req, res)=>{
        Gateway.findOne({ serialNumber: req.params.serialNumber }, (err, gateway) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else if (!gateway) {
              res.status(404).send('Gateway not found.');
            } else {
              const index = gateway.devices.findIndex(device => device.uid === Number(req.params.uid));
              if (index === -1) {
                res.status(404).send('Device not found.');
              } else {
                gateway.devices.splice(index, 1);
                gateway.save((err) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    res.send('Device removed.');
                  }
                });
              }
            }
        });
    },
    removeGateway: async(req, res)=>{
        Gateway.findOne({ serialNumber: req.params.serialNumber }, (err, gateway) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else if (!gateway) {
              res.status(404).send('Gateway not found.');
            } else {
            const g1 = gateway.delete()
              res.send(g1);
            }
        });
    }
}