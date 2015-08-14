module.exports = {
    cbsaData: cbsaData,
    generateTimeSeries: generateTimeSeries
};

function cbsaData(distribution) {

    var Factory = require('AutoFixture');

    var util = require('./util.js');
    var randgen = require('randgen');
    Factory.define('cbsaRecall', ['IATACode'.as(function(i) {
            return '0' + util.leftPad(i, 9);
        }),
        'flightName'.as(function(i) {
            return 'SK' + util.leftPad(i % 4 + 1, 3)
        }),
        'flightDate'.as(function(i) {
            return '2015-05-19'
        }),
        'bagDestination'.as(function(i) {
            if (i % 3 == 0) {
                return "YYC";
            } else if (i % 3 == 1) {
                return "FRA";
            } else {
                return "AUS";
            }
        }),
        'processTime'.as(function(i) {
            var val = distribution.scale * randgen.rnorm(distribution.mean, distribution.stddev);
            if (val < distribution.min) {
                return distribution.min;
            } else {
                return Math.floor(val);
            }
        })
    ]);

    var recalls = Factory.createListOf('cbsaRecall', distribution.count);
    return recalls;
};

function generateTimeSeries(config, consts) {
    var Factory = require('AutoFixture');
        
    var util = require('./util.js');

    var randgen = require('randgen');
    var dataPointsCount = config.count;
    durationData = [];
    for (var i = 0; i < dataPointsCount; i++) {
        //There can be five different states: 
        //Insert,Standby,Calibration,Fault,Screening
        var measurement = util.randomNumbersWithOneDominatingAllHavingSum(0, 10, config.factNames.length, config.sumTotal, config.independentFactsWeight);
        //console.log(measurement);
        durationData.push(measurement);
    };
    //console.log(durationData);

    //     for (var i = 0; i < durationData.length; i++) {
    //        console.log(durationData[i].reduce(function(a,b) {
    //        return a+b;
    //    },0))}

    var startDate = config.startDate;

    //Initialize counter determining what number data set we have reached
    var counter = -1;



    var callbackBuilder = [
        'time'.as(function(i) {
            counter++;
            var d = new Date(startDate.getTime() + counter * config.intervalSizeInMin * 60000);
            return d.toISOString().slice(0, 19).replace('T', ' ');
        })];

    for (var propt in consts) {
        callbackBuilder.push(propt.as(function(i) {
            return consts[propt];
        }))
    }

    config.factNames.forEach(function(elm, outerIndex) {
        callbackBuilder.push((elm).as(function(i) {
            return durationData[counter][outerIndex];
        }));
    });

    Factory.define('timeSeries', callbackBuilder);

    var data = Factory.createListOf('timeSeries', dataPointsCount);
   // console.log(data);
    return data;
};