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

    test.equal(parseDate(config.startDate), data[0].time, "number of data points should be defined by config.");
    test.done();
};

exports.screeningShouldEndAtExpectedTime = function(test){
    test.expect(1);
    var config = createConfig(2);
    var data = generator.generateTimeSeries(config);

    test.equal(parseDate(new Date(config.startDate.getTime() + config.intervalSizeInMin * 60000)), data[1].time, "number of data points should be defined by config.");
    test.done();
};


exports.shouldGenerateDistributionWithExpectedSum = function(test){
    var count = 10;
    test.expect(count);
    var config = createConfig(count);
    var data = generator.generateTimeSeries(config);

    data.forEach(function(elm, index) {
        test.equal(config.sumTotal, Math.round(elm.insert + elm.screening + elm.fault + elm.calibration + elm.standby), "should have the same sum for index " + index);    
    })
    
    test.done();
};

exports.shouldGenerateExpectedConsts = function(test){
    var count = 10;
    test.expect(count);
    var config = createConfig(count);
    
    var dimensionConsts = {
        gert: 'hans'
    };
    var data = generator.generateTimeSeries(config, dimensionConsts);

    data.forEach(function(elm) {
        test.equal(dimensionConsts.gert, elm.gert)    
    })
    
    test.done();
};

exports.shouldGenerateExpectedConsts = function(test){
    
    test.expect(2);
    var config = createConfig(1);
    
    var configDimensions = {
        lines: ['line1', 'line2']
    };
    var data;
    for(var dim in configDimensions) {
        configDimensions[dim].forEach(function(elm) {
            var consts = {};
            consts[dim] = elm;
            data = generator.generateTimeSeries(config, consts);
            //console.log(datai)
            test.equal(elm,data[0].lines);
        })
    }
        
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
        factNames : ['insert','standby','fault','calibration','screening'],
        independentFactsWeight : 4
    }
};
