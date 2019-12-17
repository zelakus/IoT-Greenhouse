const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api_manager');
const fuzzy = require('./fuzzy_manager');

const app = express();
let port = 80;

global.Sensors = {
    'sicaklik': 0,
    'hava_nemi': 1,
    'toprak_nemi': 99,
    'isik': 1
};

global.SensorHas = {
    'sicaklik': false,
    'hava_nemi': false,
    'toprak_nemi': false,
    'isik': false
};


global.OverwriteData = {
    'sicaklik': 0,
    'hava_nemi': 0,
    'toprak_nemi': 0,
    'isik': 0
};

global.Overwrite = false;

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

app.get('/reset', (req, res) => {
    Overwrite = false;
    res.sendStatus(200);
});

app.get('/set', (req, res) => {
    Overwrite = true;
    res.sendStatus(200);
});

app.get('/overwrite', (req, res) => {
    res.end(Overwrite.toString());
});

app.listen(port, () =>
    console.log(`Listening on port ${port}!`),
);

//fuzzy.Calculate();
//console.log(Results);