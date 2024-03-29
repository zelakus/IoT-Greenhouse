(function () {
    function Register(app) {
        //Get
        app.get('/sicaklik', (req, res) => {
            if (Overwrite)
                res.send(global.OverwriteData['sicaklik'].toString());
            else
                res.send(global.Sensors['sicaklik'].toString());
        });
        //Post
        app.post('/sicaklik', (req, res) => {
            let temp = req.body['value'];

            if (isNaN(temp)) {
                res.json({
                    status: 0,
                    message: "NaN"
                });    
                return;
            } else if (temp < -9)
            {
                temp = -9
            } else if (temp > 49) {
                temp = 49;
            }

            console.log('sicaklik: ' + temp);
            global.Sensors['sicaklik'] = temp;
            global.SensorHas['sicaklik'] = true;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
        //UI Post
        app.post('/ui_sicaklik', (req, res) => {
            let temp = req.body['value'];

            if (isNaN(temp)) {
                res.json({
                    status: 0,
                    message: "NaN"
                });    
                return;
            } else if (temp < -9)
            {
                temp = -9
            } else if (temp > 49) {
                temp = 49;
            }

            console.log('UI sicaklik: ' + temp);
            global.OverwriteData['sicaklik'] = temp;
            global.SensorHas['sicaklik'] = true;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
    }

    module.exports.Register = Register;
}());