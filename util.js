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

function randomNumbersWithOneDominatingHavingSum(low, high, count, expectedSum, independentFactsWeight) {

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
        var weight = randomUniformIntInc(0, independentFactsWeight);
        var data = result.map(function(elm) {
            if (sum > 0)
                return Math.round(weight * (elm / sum));
            else return 0;
        });
        var sumAfterScaling = data.reduce(function(a,b) {
            return a+b;
        }, 0);
        
//console.log(dataWithoutScreening); 
//insert the final number ensuring we sum to expectedSum
        
        data.push(expectedSum - sumAfterScaling);
        /*
        data.forEach(function(elm) {
            if (Number.isNaN(elm)) {
        console.log('Expected sum: ' + expectedSum);
        console.log('Weight: ' + weight);
        console.log('Sum after scaling; ' + sumAfterScaling);
                
                console.log('low: ' + low + ',high: ' + high + ', count: ' + count + ', expectedSum: ' + expectedSum + ', independentFactsWeight: ' +independentFactsWeight )
            }
        })
*/
        return data;

    };