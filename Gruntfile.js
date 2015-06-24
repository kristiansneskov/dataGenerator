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
        var dataGenerator = require('./dataGenerator.js');
        var distribution = this.data.distribution;
        var recalls = dataGenerator.generateData(distribution);

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
