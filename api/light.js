(function () {
    function Register(app) {
        //Get
        app.get('/isik', (req, res) => {
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
    }

    module.exports.Register = Register;
}());