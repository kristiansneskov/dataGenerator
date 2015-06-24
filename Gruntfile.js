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
        var recalls = dataGenerator.generateData(this.data.distribution);

        var fileGenerator = require('./fileGenerator.js');

        fileGenerator.asXml(this.target, recalls);



    });
};
