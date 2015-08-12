var generator = require("../dataGenerator.js");

exports.screeningShouldReturnExpectedNumberOfDataPoints = function(test){
    test.expect(1);
    var config = createConfig(64);
    var data = generator.generateTimeSeries(config);

    test.equal(config.count, data.length, "number of data points should be defined by config.");
    test.done();
};

exports.screeningShouldBeginAtExpectedTime = function(test){
    test.expect(1);
    var config = createConfig(64);
    var data = generator.generateTimeSeries(config);

    test.equal(parseDate(config.startDate), data[0].summaryTimeStart, "number of data points should be defined by config.");
    test.done();
};

exports.screeningShouldEndAtExpectedTime = function(test){
    test.expect(1);
    var config = createConfig(2);
    var data = generator.generateTimeSeries(config);

    test.equal(parseDate(new Date(config.startDate.getTime() + config.intervalSizeInMin * 60000)), data[1].summaryTimeStart, "number of data points should be defined by config.");
    test.done();
};


exports.shouldUseExpectedLineName = function(test){
    test.expect(1);
    var config = createConfig(10);
    var data = generator.generateTimeSeries(config);

    test.equal(config.lineName, data[0].screeningLine, "line names do not match.");
    test.done();
};

exports.shouldGenerateDistributionWithExpectedSum = function(test){
    var count = 10;
    test.expect(count);
    var config = createConfig(count);
    var data = generator.generateTimeSeries(config);

    data.forEach(function(elm, index) {
        test.equal(config.sumTotal, Math.round(elm.durationInsert + elm.durationScreening + elm.durationFault + elm.durationCalibration + elm.durationStandby), "should have the same sum for index " + index);    
    })
    
    test.done();
};

function parseDate(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function createConfig(count) {
    return {
        count : count,
        startDate : new Date(2014, 3, 5, 12),
        intervalSizeInMin : 15,
        sumTotal : 15,
        lineName: 'gert',
        factNames : ['insert','standby','fault','calibration','screening']
    }
};
