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
        }, 
        screening: {
        	screening_case1: {}
        }
    } 
   );

    grunt.registerMultiTask('cbsa_recall', 'data generator for Calgary CBSA recall report', function() {
        var dataGenerator = require('./dataGenerator.js');
        var recalls = dataGenerator.cbsaData(this.data.distribution);

        var fileGenerator = require('./fileGenerator.js');

        fileGenerator.cbsaAsXml(this.target, recalls);
    });
    grunt.registerMultiTask('screening', 'data generator for Calgary Screening Line Availability.', function() {

        var dataGenerator = require('./dataGenerator.js');
        var data = dataGenerator.screeningData(this.data);

        var fileGenerator = require('./fileGenerator.js');

        fileGenerator.screeningAsXml(this.target, data);
    });
};
