'use strict';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const express = require('express');
const path = require('path');
//import { logger } from './middlewares.js';



const __dirname = path.resolve();
const PORT = process.env.PORT || 8080;
const app = express();

const GALLERY = require('./images.json');
const DOCS = require('./docs.json');
//HA
const HomeAssistant = require('homeassistant');
const hass = new HomeAssistant({
  host: 'http://192.168.1.120',
  port: 8123,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwZDhjYzQ3MDRhOTk0NWVjOTNhMDg2ZGJkYmEzODFkNiIsImlhdCI6MTY4MDYwNzE5MywiZXhwIjoxOTk1OTY3MTkzfQ.zhjvcu4acLj26X6-f0wfpPfEQRfY_19eEE32yNqkriQ',
  ignoreCert: false
});
//

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.use('/js/bootstrap.js', express.static('node_modules/bootstrap/dist/js/bootstrap.bundle.js'));


app.get('/', (req, res) => {
    res.render('pages/index', {title: 'Home', active: 'home'})
});

app.get('/gallery', (req, res) => {
    res.render('pages/gallery', {title: 'Gallery', active: 'gallery', photos: GALLERY})
});

app.get('/docs', (req, res) => {
    res.render('pages/docs', {title: 'Documents', active: 'docs', docs: DOCS})
});

app.get('/contacts', (req, res) => {
    res.render('pages/contacts', {title: 'Contacts', active: 'contacts'})
});

//ha
// Declare the sensors array outside the route handler
const sensors = ['sensor.temperature_01', 'sensor.temperature_02', 'sensor.temperature_03', 'sensor.temperature_04'];

// Define a function to retrieve the sensor state
function getSensorState() {
    const promises = sensors.map(sensor => hass.templates.render(`{{ states("${sensor}") }}`));
    return Promise.all(promises)
        .then((results) => {
            const data = results.reduce((acc, val, idx) => {
                acc[sensors[idx]] = val;
                return acc;
            }, {});
            return data;
        })
        .catch((error) => {
            console.error(error);
            return 'Error fetching sensor state';
        });
}

// Call the getSensorState function initially to populate the page
let sensorState = {};
getSensorState()
    .then((data) => {
        sensorState = data;
        console.log('Initial sensor state:', sensorState);
    });

// Use setInterval to update the sensor data every minute
setInterval(() => {
    getSensorState()
        .then((data) => {
            sensorState = data;
            console.log('New sensor state:', sensorState);
        });
},60 * 60 * 1000);

// Handle the /sensor-state route
app.get('/sensor-state', (req, res) => {
    res.render('pages/sensorstate', {title: 'Sensor State', active: 'sensor-state', sensorstate: sensorState});
});
//


app.listen(PORT, () => {
    console.log(`server run in port ${PORT}`);
});