var generator = require("../dataGenerator.js");

exports.screeningShouldReturnExpectedNumberOfDataPoints = function(test){
    test.expect(1);
    var config = {
        count : 64
    };
    var data = generator.screeningData(config);

    test.equal(config.count, data.length, "number of data points should be defined by config.");
    test.done();
};