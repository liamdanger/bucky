const ENV = process.env.NODE_ENV

if (ENV !== 'production') require('dotenv').config()

const twilio = require('twilio');
const bodyParser = require('body-parser');
const express = require('express')
const knex = require('./utils/configure-knex.js')
const app = express()
const MessagingResponse = require('twilio').twiml.MessagingResponse

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    knex('logs').select().then(rows => {
        console.log(`displaying ${rows.length} rows`)
        res.json(rows)
    })
})

app.post('/sms', twilio.webhook({ validate: ENV === 'production' }), (req, res) => {
    const twiml = new MessagingResponse()

    knex('logs').insert({
        body: req.body.Body,
        created_at: new Date().toISOString()
    }).then(rows => {
        console.log(rows)
    })

  	twiml.message('Excelsior!')

	res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
})

app.listen('3000', () => {
    console.log('server running on port 3000')
})
