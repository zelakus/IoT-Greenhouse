(function () {
    function RegisterAPIs(app) {
        require('./api/temperature').Register(app);
        require('./api/air_moisture').Register(app);
        require('./api/soil_moisture').Register(app);
        require('./api/light').Register(app);
        require('./api/tm_group').Register(app);
        require('./api/results').Register(app);
    }
    
    module.exports.Init = RegisterAPIs;
}());