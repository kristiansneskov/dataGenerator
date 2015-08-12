module.exports = {
    cbsaData: cbsaData,
    screeningData: screeningData
};

function cbsaData(distribution) {
    var Factory = require('AutoFixture');

    function randomUniformIntInc(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }


    function leftPad(str, length) {
        str = str == null ? '' : String(str);
        length = ~~length;
        pad = '';
        padLength = length - str.length;

        while (padLength--) {
            pad += '0';
        }

        return pad + str;
    }
    var randgen = require('randgen');
    Factory.define('cbsaRecall', ['IATACode'.as(function(i) {
            return '0' + leftPad(i, 9);
        }),
        'flightName'.as(function(i) {
            return 'SK' + leftPad(i % 4 + 1, 3)
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

function screeningData(config) {
    var Factory = require('AutoFixture');

    function randomUniformIntInc(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }


    function leftPad(str, length) {
        str = str == null ? '' : String(str);
        length = ~~length;
        pad = '';
        padLength = length - str.length;

        while (padLength--) {
            pad += '0';
        }

        return pad + str;
    }

    function randomNumbersSumOne(low, high, count) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(randomUniformIntInc(low, high));
        };
        //console.log(result);
        var sum = result.reduce(function(a, b) {
            return a + b;
        }, 0);
        var scale = randomUniformIntInc(0, 4);
        var dataWithoutScreening = result.map(function(elm) {
            return scale * (elm / sum);
        });

        var gert = dataWithoutScreening.push(15 - scale);
        //console.log(dataWithoutScreening); 
        return dataWithoutScreening;

    };

    var randgen = require('randgen');
    var dataPointsCount = config.count;
    durationData = [];
    for (var i = 0; i < dataPointsCount; i++) {
        //There can be five different states: 
        //Insert,Standby,Calibration,Fault,Screening
        var measurement = randomNumbersSumOne(0, 10, 4);
        //      console.log(measurement);
        durationData.push(measurement);
    };
   // console.log(durationData);

    //     for (var i = 0; i < durationData.length; i++) {
    //        console.log(durationData[i].reduce(function(a,b) {
    //        return a+b;
    //    },0))}

    var startDate = new Date(2014, 3, 5, 12);

    //Initialize counter determining what number data set we have reached
    var counter = -1;

    Factory.define('screenAvail', [
        'summaryTimeStart'.as(function(i) {
            counter++;
            var d = new Date(startDate.getTime() + counter * 15 * 60000);
            return d.toISOString().slice(0, 19).replace('T', ' ');
            //return i;
            //return '2014-04-02 12:05:00.000';
        }),
        'screeningLine'.as(function(i) {
            return 'HBS XL113'
        }),
        'durationInsert'.as(function(i) {
            return durationData[counter][0];
        }),
        'durationStandby'.as(function(i) {
            return durationData[counter][1];
        }),
        'durationFault'.as(function(i) {
            return durationData[counter][2];
        }),
        'durationCalibration'.as(function(i) {
            return durationData[counter][3];
        }),
        'durationScreen'.as(function(i) {
            return durationData[counter][4];
        })

    ]);

    var data = Factory.createListOf('screenAvail', dataPointsCount);
    return data;
};