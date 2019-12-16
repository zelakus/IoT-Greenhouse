(function () {
    function Register(app) {
        //Get
        app.get('/toprak_nemi', (req, res) => {
            res.send(global.Sensors['toprak_nemi'].toString());
        });
        //Post
        app.post('/toprak_nemi', (req, res) => {
            let moist = req.body['value'];

            if (isNaN(moist)) {
                res.json({
                    status: 0,
                    message: "NaN"
                });    
                return;
            } else if (moist < 0)
            {
                moist = 0;
            } else if (moist > 1024) {
                moist = 1024;
            }

            //Convertion
            moist = 100*(1024-moist)/1024;
            if (moist < 1)
            {
                moist = 1;
            } else if (moist > 99) {
                moist = 99;
            }

            console.log('toprak nemi: ' + moist);
            global.Sensors['toprak_nemi'] = moist;
            global.SensorHas['toprak_nemi'] = true;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
    }

    module.exports.Register = Register;
}());