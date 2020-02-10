const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//set static path

app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json());
const publicVapidKey = 'BJ6V4eliz4-DkWQaqK5GtGrzh5cQHbFqZ4sH-tAA_sJedS1U3QdcN-VP6ugjXofCEJ5ikfkQNlUi3mwNiOrYdvQ';
const privateVapidKey = 'Gk-UGi2vJdJPZFPNW1InshSVJPio4rL_piTSO9wolGg';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey );

app.post('/subscribe', (req, res) => {
//Get PushSubscription Object

const subscription = req.body

//send 201 - resource  created

res.status(201).json({});

//const payload

const payload = JSON.stringify({title: 'PKD'});

//pass object into sendNotification
webpush.sendNotification(subscription, payload).catch(err => {
    console.log(err);
})

})

app.listen(3055, () => {
    console.log('server started');
})
