const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api_manager');
const fuzzy = require('./fuzzy_manager');

const app = express();
let port = 80;

global.Sensors = {
    'sicaklik': 0,
    'hava_nemi': 99,
    'toprak_nemi': 99,
    'isik': 0
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
    //res.send("nah login");
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(port, () =>
    console.log(`Listening on port ${port}!`),
);
fuzzy.Calculate();
/*

app.get(‘*’, function(req, res){
res.sendFile(__dirname+’/public/error.html’);
}

*/