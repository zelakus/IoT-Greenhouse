(function () {
    function Register(app) {
        //Get
        app.get('/isik', (req, res) => {
            if (Overwrite)
                res.send(global.OverwriteData['isik'].toString());
            else
                res.send(global.Sensors['isik'].toString());
        });
        //Post
        app.post('/isik', (req, res) => {
            let light = req.body['value'];

            if (isNaN(light)) {
                res.json({
                    status: 0,
                    message: "NaN"
                });
                return;
            } else if (light < 1)
            {
                light = 1;
            } else if (light > 19999) {
                light = 19999;
            }

            console.log('Isik: ' + light);
            global.Sensors['isik'] = light;
            global.SensorHas['isik'] = true;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
        //UI
        app.post('/ui_isik', (req, res) => {
            let light = req.body['value'];

            if (isNaN(light)) {
                res.json({
                    status: 0,
                    message: "NaN"
                });
                return;
            } else if (light < 1)
            {
                light = 1;
            } else if (light > 19999) {
                light = 19999;
            }

            console.log('UI Isik: ' + light);
            global.OverwriteData['isik'] = light;
            global.SensorHas['isik'] = true;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
    }

    module.exports.Register = Register;
}());