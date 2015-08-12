var generator = require("../dataGenerator.js");



exports.shouldWorkAsFailsafeUntilProperTestsAreInPlaceForCBSA = function(test){
    test.expect(1); //expect one assertion
    var config = {count : 10}
    var data = generator.cbsaData(config);
   // test.ok(true, "should not throw when calling cbsa");
    test.equal(config.count,data.length, "should generate number of data points defined by config.")
    test.done();
};

