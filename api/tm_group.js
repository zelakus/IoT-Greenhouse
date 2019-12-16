(function () {
    function Register(app) {
        //Get
        app.get('/data', (req, res) => {
            res.json(
                {
                    isik: global.Sensors['isik'],
                    hava_nemi: global.Sensors['hava_nemi'],
                    toprak_nemi: global.Sensors['toprak_nemi']
                });
        });
        //Post
        app.post('/data', (req, res) => {
            let temp = req.body['isik'];
            let amois = req.body['hava_nemi'];
            let smois = req.body['toprak_nemi'];

            if (isNaN(temp)) {
                res.json({
                    status: 0,
                    message: "Given isik is not a number."
                });    
                return;
            } else if (temp < -30 || temp > 60) {
                res.json({
                    status: 0,
                    message: "Given isik is abnormal."
                });    
                return;
            }
            
            if (isNaN(amois)) {
                res.json({
                    status: 0,
                    message: "Given air moisture is not a number."
                });    
                return;
            } else if (amois < 0 || amois > 100) {
                res.json({
                    status: 0,
                    message: "Given air moisture is abnormal."
                });    
                return;
            }
            
            if (isNaN(smois)) {
                res.json({
                    status: 0,
                    message: "Given soil moisture is not a number."
                });    
                return;
            } else if (smois < 0 || smois > 100) {
                res.json({
                    status: 0,
                    message: "Given soil moisture is abnormal."
                });    
                return;
            }

            global.Sensors['isik'] = temp;
            global.Sensors['hava_nemi'] = amois;
            global.Sensors['toprak_nemi'] = smois;
            res.json({
                status: 1,
                message: "Successfully changed."
            });
            global.SensorsUpdated();
        });
    }

    module.exports.Register = Register;
}());