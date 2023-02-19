const mongoose = require('mongoose')

const peripheralDeviceSchema = new mongoose.Schema({
    uid: {
      type: Number,
      required: true,
      unique: true
    },
    vendor: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline'
    }
}, {timestamps: true});

const gatewaySchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    ipv4Address: {
        type: String,
        required: true,
        match: /^(\d{1,3}\.){3}\d{1,3}$/
    },
    devices: {
        type: [peripheralDeviceSchema],
        validate: [devicesLimit, '{PATH} exceeds the limit of 10']
    }
});

function devicesLimit(val) {
  return val.length <= 10;
}

const PeripheralDevice = mongoose.model('PeripheralDevice', peripheralDeviceSchema);
const Gateway = mongoose.model('Gateway', gatewaySchema);

module.exports = {
  PeripheralDevice,
  Gateway
};