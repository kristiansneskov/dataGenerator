module.exports = function(grunt) {
    grunt.initConfig({
        cbsa_recall: {
            case1: {
                distribution: {
	            min: -3,
                    mean: 0,
		    stddev: 5,
		    count : 180,
		    scale: 3
                }
            },
	    case2: {
		distribution: {
	            min: -3,
                    mean: 0,
		    stddev: 3,
		    count:100,
		    scale:1
		}
	    },
	    case3: {
		distribution: {
	            min: -3,
                    mean: 0,
		    stddev: 1,
		    count:10,
		    scale:1
		}
	    },
	    case4: {
		distribution: {
	            min: 3,
                    mean: 3,
		    stddev: 0,
		    count:2,
		    scale:1
		}
	    }
        }
    });

    grunt.registerMultiTask('cbsa_recall', 'data generator.', function() {
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

	var distribution = this.data.distribution;

        var randgen = require('randgen');
        Factory.define('cbsaRecall', ['IATACode'.as(function(i) {
                return '1' + leftPad(i, 9);
            }),
            'flightName'.as(function(i) {
                return 'SK' + leftPad(i % 4 + 1, 3)
            }),
            'flightDate'.as(function(i) {
                return '2015-05-19'
            }),
            'bagDestination'.as(function(i) {
                return 'CAN' + i % 5 + 1
            }),
            'processTime'.as(function(i) {
                var val = distribution.scale * randgen.rnorm(distribution.mean, distribution.stddev);
                if (val < distribution.min ) {
	      	    return distribution.min;
		} else {
                    return Math.floor(val);
   		}
            })
        ]);

        var recalls = Factory.createListOf('cbsaRecall', distribution.count);

        var xmlBuilder = require('xmlbuilder');
        var rootQuery = xmlBuilder.create('Query');
        var xmlData = rootQuery.ele('XmlData');
        var root = xmlData.ele('items');
        recalls.forEach(function(elm) {
            var item = root.ele('data');
            item.ele('IATACode', elm.IATACode);
            item.ele('flightName', elm.flightName);
            item.ele('flightDate', elm.flightDate);
            item.ele('bagDestination', elm.bagDestination);
            item.ele('processTime', elm.processTime);
        });
        var fs = require('fs');
        fs.writeFileSync('./'+this.target+'.xml', rootQuery.toString());

    });
};
