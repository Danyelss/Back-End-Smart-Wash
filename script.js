const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Device = require('./models/device')
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://test.mosquitto.org", { clientId: "mqttjs01" })
const { test } = require("./mqttService");

mongoose.connect('mongodb://localhost/firstmongo')

app.use('/', express.static(path.resolve(__dirname, 'assets')))

app.use(bodyParser.json())

app.post('/api/delete', async (req, res) => {
	const { device } = req.body
	console.log(device, '/api/delete')

	const response = await Device.deleteOne({ device })

	console.log(response, '/api/delete repsonse')

	res.json({ status: 'ok' })
})

app.post('/api/modify', async (req, res) => {
	const { deviceId: device, program: program } = req.body;

	await Device.updateOne({ deviceId: device },
		{ program: program }, function (err, docs) {
			if (err) {
				console.log(err)
			}
			else {
				console.log("Updated Docs : ", docs);
			}
		});

	res.json({ status: 'ok' })
})

app.get('/api/get', async (req, res) => {
	const devices = await Device.find({})
	// console.log('Response => ', records)
	res.json(devices)
})

app.get('/api/one', async (req, res) => {
	const { deviceId: device } = req.body;

	const devices = await Device.find({ deviceId: device })
	// console.log('Response => ', records)
	res.json(devices)
})

app.post('/api/create', async (req, res) => {
	const { deviceId: deviceId, program: program, timer: timer } = req.body;
	const device = req.body;
	console.log(deviceId)

	// * CREATE (_C_RUD)

	const devices = await Device.find({ deviceId: deviceId })

	if (devices.length == 0) {

		const response = await Device.create(device)

		console.log(response)

		res.json({ status: 'ok' })
	}

	res.json({ status: 'not ok' })
})

app.listen(13371, '127.0.0.1', () => {
	console.log('Server up')

	// thread test after dev server startup
})

test();

