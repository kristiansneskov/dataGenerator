module.exports = function(grunt) {
	grunt.initConfig({
		cbsa_recall: {
			case1: {
				distribution: {
					min: -3,
					mean: 0,
					stddev: 5,
					count: 180,
					scale: 3
				}
			},
			case2: {
				distribution: {
					min: -3,
					mean: 0,
					stddev: 3,
					count: 100,
					scale: 1
				}
			},
			case3: {
				distribution: {
					min: -3,
					mean: 0,
					stddev: 1,
					count: 10,
					scale: 1
				}
			},
			case4: {
				distribution: {
					min: 3,
					mean: 3,
					stddev: 0,
					count: 2,
					scale: 1
				}
			}
		},
		screening: {
			screening_case1: {
				timeSeries: {
					count: 32,
					startDate : new Date(2014, 3, 5, 12),
					intervalSizeInMin : 15,
					sumTotal : 15,
					factNames : ['insert','standby','fault','calibration','screen'],
					independentFactsWeight : 4
				},
				dimensions : {
					screeningLine : ['HBS XL113','HBS XL126']
				}
			}
		},
		smd: {
			smd_case1: {
				timeSeries: {
					count: 64,
					startDate : new Date(2014, 3, 5, 12),
					intervalSizeInMin : 15,
					sumTotal : 100,
					factNames : ['reject','unanalyzed','clear'],
					independentFactsWeight : 50
				},
				dimensions : {
					screeningLine : ['HBS XL113']
				}
			}
		},
		sodt: {
			sodt_case1: {
				timeSeries: {
					count: 64,
					startDate : new Date(2014, 3, 5, 12),
					intervalSizeInMin : 15,
					sumTotal : 100,
					factNames : ['region2','region3','region4','region5','region6','region1'],
					independentFactsWeight : 30
				},
				dimensions : {
					screeningLine : ['HBS XL113']
				}
			}
		},
		nodeunit: {
			all: ['spec/*spec.js'],
			options: {
				reporter: 'junit',
				reporterOptions: {
					output: 'outputdir'
				}
			}
		}
	});

	grunt.registerMultiTask('cbsa_recall', 'data generator for Calgary CBSA recall report', function() {
		var dataGenerator = require('./dataGenerator.js');
		var recalls = dataGenerator.cbsaData(this.data.distribution);

		var fileGenerator = require('./fileGenerator.js');

		fileGenerator.cbsaAsXml(this.target, recalls);
	});
	grunt.registerMultiTask('screening', 'data generator for Calgary Screening Line Availability.', function() {

		var dataGenerator = require('./dataGenerator.js');
		var config = this.data;
		var data = [];
		for(var dim in this.data.dimensions) {
        	this.data.dimensions[dim].forEach(function(elm) {
            	var consts = {};
            	consts[dim] = elm;
            	data.push.apply(data, dataGenerator.generateTimeSeries(config.timeSeries, consts));
        	})
    	}
		//var data = dataGenerator.generateTimeSeries(this.data.timeSeries, consts);
		
		var fileGenerator = require('./fileGenerator.js');

		fileGenerator.screeningAsXml(this.target, data);
	});
	grunt.registerMultiTask('smd', 'data generator for Calgary Screening Machine Decisions.', function() {

		var dataGenerator = require('./dataGenerator.js');
		
		//var data = dataGenerator.generateTimeSeries(this.data.timeSeries, this.data.dimensions);
		var config = this.data;
		var data = [];
		for(var dim in this.data.dimensions) {
        	this.data.dimensions[dim].forEach(function(elm) {
            	var consts = {};
            	consts[dim] = elm;
            	data.push.apply(data, dataGenerator.generateTimeSeries(config.timeSeries, consts));
        	})
    	}
		var fileGenerator = require('./fileGenerator.js');

		fileGenerator.smdAsXml(this.target, data);
	});

	grunt.registerMultiTask('sodt', 'data generator for Calgary Screening Officer Decision Time.', function() {

		var dataGenerator = require('./dataGenerator.js');
		
		//var data = dataGenerator.generateTimeSeries(this.data.timeSeries, this.data.dimensions);
		var config = this.data;
		var data = [];
		for(var dim in this.data.dimensions) {
        	this.data.dimensions[dim].forEach(function(elm) {
            	var consts = {};
            	consts[dim] = elm;
            	data.push.apply(data, dataGenerator.generateTimeSeries(config.timeSeries, consts));
        	})
    	}
		var fileGenerator = require('./fileGenerator.js');

		fileGenerator.sodtAsXml(this.target, data);
	});

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
};