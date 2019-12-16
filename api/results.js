(function () {
    function Register(app) {
        //Get
        app.get('/result', (req, res) => {
            res.send(JSON.stringify(global.Results));
        });
    }
    
    module.exports.Register = Register;
}());