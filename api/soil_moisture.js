(function () {
    function Register(app) {
        //Get
        app.get('/toprak_nemi', (req, res) => {
            var moist = global.Sensors['toprak_nemi'];
            if (Overwrite)
                moist = global.OverwriteData['toprak_nemi'].toString();
            //Convertion
            moist = 424 - moist*4.24
            moist += 600;

            res.send(moist.toString());
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
            moist -= 600;
            moist = 100*(424-moist)/424;
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
        //UI Post
        app.post('/ui_toprak_nemi', (req, res) => {
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
            moist -= 600;
            moist = 100*(424-moist)/424;
            if (moist < 1)
            {
                moist = 1;
            } else if (moist > 99) {
                moist = 99;
            }

            console.log('UI toprak nemi: ' + moist);
            global.OverwriteData['toprak_nemi'] = moist;
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