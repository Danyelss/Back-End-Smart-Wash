const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
	deviceId: { type: String, required: true },
	program: { type: String, required: true },
	timer: { type: String, required: true },

})

const model = mongoose.model('DeviceModel', DeviceSchema)

module.exports = model
