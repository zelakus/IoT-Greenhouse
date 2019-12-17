(function () {
    function Register(app) {
        //Get
        app.get('/hava_nemi', (req, res) => {
            if (Overwrite)
                res.send(global.OverwriteData['hava_nemi'].toString());
            else
                res.send(global.Sensors['hava_nemi'].toString());
        });
        //Post
        app.post('/hava_nemi', (req, res) => {
            let moist = req.body['value'];

            if (isNaN(moist)) {
                res.json({
                    status: 0,
                    message: "NaN"
                });
                return;
            } else if (moist < 1) {
                moist = 1;
            } else if (moist > 99) {
                moist = 99;
            }

            console.log('hava nemi: ' + moist);
            global.Sensors['hava_nemi'] = moist;
            global.SensorHas['hava_nemi'] = true;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
        //UI Post
        app.post('/ui_hava_nemi', (req, res) => {
            let moist = req.body['value'];

            if (isNaN(moist)) {
                res.json({
                    status: 0,
                    message: "NaN"
                });
                return;
            } else if (moist < 1) {
                moist = 1;
            } else if (moist > 99) {
                moist = 99;
            }

            console.log('UI hava nemi: ' + moist);
            global.OverwriteData['hava_nemi'] = moist;
            global.SensorHas['hava_nemi'] = true;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
    }

    module.exports.Register = Register;
}());