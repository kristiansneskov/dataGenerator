var generator = require("../dataGenerator.js");



exports.testSomething = function(test){
    test.expect(1);
    generator.cbsaData({count : 1});
    generator.screeningData();
    test.ok(true, "this assertion should pass");
    test.done();
};