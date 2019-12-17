(function () {
    function RegisterAPIs(app) {
        require('./api/temperature').Register(app);
        require('./api/humidity').Register(app);
        require('./api/soil_moisture').Register(app);
        require('./api/light').Register(app);
        
        require('./api/results').Register(app);
    }
    
    module.exports.Init = RegisterAPIs;
}());