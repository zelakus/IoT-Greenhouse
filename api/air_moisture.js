(function () {
    function Register(app) {
        //Get
        app.get('/hava_nemi', (req, res) => {
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

            global.Sensors['hava_nemi'] = moist;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
    }

    module.exports.Register = Register;
}());