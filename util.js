module.exports = {
    randomUniformIntInc: randomUniformIntInc,
    leftPad : leftPad,
    randomNumbersWithOneDominatingAllHavingSum : randomNumbersWithOneDominatingHavingSum
};

function randomUniformIntInc(low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    };

function leftPad(str, length) {
    str = str == null ? '' : String(str);
        length = ~~length;
        pad = '';
        padLength = length - str.length;

        while (padLength--) {
            pad += '0';
        }

        return pad + str;
    };

function randomNumbersWithOneDominatingHavingSum(low, high, count, expectedSum) {

        var result = [];
        //subtract one from count - that one is generated as difference between generated numbers and finalSum
        var independentNumberCount = count - 1;
        for (var i = 0; i < independentNumberCount; i++) {
            result.push(randomUniformIntInc(low, high));
        };
        //console.log(result);
        var sum = result.reduce(function(a, b) {
            return a + b;
        }, 0);
        var weight = randomUniformIntInc(0, 4);
        var data = result.map(function(elm) {
            return weight * (elm / sum);
        });
//console.log(dataWithoutScreening); 
//insert the final number ensuring we sum to expectedSum
        data.push(expectedSum - weight);
        
        return data;

    };