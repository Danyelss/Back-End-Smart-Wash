const mqtt = require('mqtt')

const host = 'broker.emqx.io'
const port = '1883'
const clientId = 'biudaiStefan'

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
})

const test = () => {

    const topic = '/test/topic';

    client.on('connect', () => {
        console.log('Connected')
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`)
        })
        client.publish(topic, 'TEST ', { qos: 1, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    })
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    });
}

module.exports = { test };