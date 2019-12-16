const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api_manager');
const fuzzy = require('./fuzzy_manager');

const app = express();
let port = 80;

global.Sensors = {
    'sicaklik': 23,
    'hava_nemi': 95,
    'toprak_nemi': 90,
    'isik': 0
};

global.SensorHas = {
    'sicaklik': true,
    'hava_nemi': true,
    'toprak_nemi': true,
    'isik': false
};

global.Results = {
    'servo_angle': 0,
    'pumping_duration': 0,
    'light_amount': 0
}

global.SensorsUpdated = function() {
    fuzzy.Calculate();
}

//API Handling
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

api.Init(app);
app.post('/login', (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () =>
    console.log(`Listening on port ${port}!`),
);

//fuzzy.Calculate();
//console.log(Results);