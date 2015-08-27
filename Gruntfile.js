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
			daily: {
				timeSeries: {
					count: 1440,
					startDate : new Date(2015, 4, 14, 12),
					intervalSizeInMin : 1,
					sumTotal : 60,
					factNames : ['insert','standby','fault','calibration','screen'],
					independentFactsWeight : 10
				},
				dimensions : {
					screeningLine : ['HBS XL113','HBS XL126','HBS XL143', 'HBS XL156', 'HBS XO111', 'HBS XO121']
				},
				output : {
					db : {
						active: true,
						mssql: {
							connection : {
								user: '',
	        					password: '',
	        					server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
	        					database: 'cis_dbStatistics',
	
        						options: {
            						encrypt: false // Use this if you're on Windows Azure
        						}
        					},
        					target: {
        						name : 'tblScreeningLineAvailabilitySummary',
        						clean: true
        					}
						}
					},
					xml: {
						active: false
					}
				}
			},
			weekly: {
				timeSeries: {
					count: 10080,
					startDate : new Date(2015, 4, 14, 12),
					intervalSizeInMin : 1,
					sumTotal : 60,
					factNames : ['insert','standby','fault','calibration','screen'],
					independentFactsWeight : 10
				},
				dimensions : {
					screeningLine : ['HBS XL113','HBS XL126','HBS XL143', 'HBS XL156', 'HBS XO111', 'HBS XO121']
				},
				output : {
					db : {
						active: true,
						mssql: {
							connection : {
								user: '',
	        					password: '',
	        					server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
	        					database: 'cis_dbStatistics',
	
        						options: {
            						encrypt: false // Use this if you're on Windows Azure
        						}
        					},
        					target: {
        						name : 'tblScreeningLineAvailabilitySummary',
        						clean: true
        					}
						}
					},
					xml: {
						active: false
					}
				}
			},
			monthly: {
				timeSeries: {
					count: 43200,
					startDate : new Date(2015, 3, 1, 12), //Remember months are zero based!
					intervalSizeInMin : 1,
					sumTotal : 60,
					factNames : ['insert','standby','fault','calibration','screen'],
					independentFactsWeight : 10
				},
				dimensions : {
					screeningLine : ['HBS XL113','HBS XL126','HBS XL143', 'HBS XL156', 'HBS XO111', 'HBS XO121']
				},
				output : {
					db : {
						active: true,
						mssql: {
							connection : {
								user: '',
	        					password: '',
	        					server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
	        					database: 'cis_dbStatistics',
	
        						options: {
            						encrypt: false // Use this if you're on Windows Azure
        						}
        					},
        					target: {
        						name : 'tblScreeningLineAvailabilitySummary',
        						clean: true
        					}
						}
					},
					xml: {
						active: false
					}
				}
			},
			screening_case2: {
				timeSeries: {
					count: 4,
					startDate : new Date(2014, 3, 5, 12),
					intervalSizeInMin : 15,
					sumTotal : 900,
					factNames : ['insert','standby','fault','calibration','screen'],
					independentFactsWeight : 100
				},
				dimensions : {
					screeningLine : ['HBS XL113','HBS XL126','HBS XL143', 'HBS XL156', 'HBS XO111', 'HBS XO121']
				},
				output : {
					db : {
						active: false
					},
					xml : {
						active: true
					}
				}
			},
			screening_case3: {
				timeSeries: {
					count: 32,
					startDate : new Date(2014, 3, 5, 12),
					intervalSizeInMin : 15,
					sumTotal : 900,
					factNames : ['insert','standby','fault','calibration','screen'],
					independentFactsWeight : 100
				},
				dimensions : {
					screeningLine : ['HBS XL113','HBS XL126']
				},
				output : {
					db : {
						active: false
					},
					xml : {
						active: true
					}
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
		sod: {
			sod_case1: {
				timeSeries: {
					count: 64,
					startDate : new Date(2014, 3, 5, 12),
					intervalSizeInMin : 15,
					sumTotal : 100,
					factNames : ['reject','timeout','clear'],
					independentFactsWeight : 40
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
		if (config.output.db.active) {

			var outputGenerator = require('./fileGenerator.js');
			var done = this.async();
			outputGenerator.screeningToDb(config.output.db.mssql, data, function(err) {
				if (err) {
					grunt.log.error(err);
					done(false);
				} else {
					grunt.log.writeln('Inserted ' + data.length + ' entities into ' + config.output.db.mssql.target.name);
					done();	
				}
			});
		} 
		if (config.output.xml.active) {
			var fileGenerator = require('./fileGenerator.js');

			fileGenerator.screeningAsXml(this.target, data);	
			grunt.log.writeln('Wrote ' + data.length + ' entities to xml');
		}
		
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

	grunt.registerMultiTask('sod', 'data generator for Calgary Screening Officer Decisions.', function() {

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

		fileGenerator.sodAsXml(this.target, data);
	});
	

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
};