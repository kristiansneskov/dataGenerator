module.exports = {
	generateData: function(distribution) {
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
        return recalls;
	} 
}