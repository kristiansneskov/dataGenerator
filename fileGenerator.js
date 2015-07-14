module.exports = {

cbsaAsXml : function(name, data) {
    var xmlBuilder = require('xmlbuilder');
        var rootQuery = xmlBuilder.create('Query');
        var xmlData = rootQuery.ele('XmlData');
        var root = xmlData.ele('items');
        data.forEach(function(elm) {
            var item = root.ele('data');
            item.ele('IATACode', elm.IATACode);
            item.ele('flightName', elm.flightName);
            item.ele('flightDate', elm.flightDate);
            item.ele('bagDestination', elm.bagDestination);
            item.ele('processTime', elm.processTime);
        });
        var fs = require('fs');
        fs.writeFileSync('./'+name+'.xml', rootQuery.toString());
},
screeningAsXml : function(name, data) {
    var xmlBuilder = require('xmlbuilder');
        var rootQuery = xmlBuilder.create('Query');
        var xmlData = rootQuery.ele('XmlData');
        var root = xmlData.ele('items');
        data.forEach(function(elm) {
            var item = root.ele('data');
            item.ele('SummaryTimeStart', elm.summaryTimeStart);
            item.ele('ScreeningLine', elm.screeningLine);
            item.ele('DurationInsert', elm.durationInsert.toString().replace(".",","));
            item.ele('DurationStandby', elm.durationStandby.toString().replace(".",","));            
            item.ele('DurationFault', elm.durationFault.toString().replace(".",","));
            item.ele('DurationCalibration', elm.durationCalibration.toString().replace(".",","));
            item.ele('DurationScreening', elm.durationScreen.toString().replace(".",","));
        });
        var fs = require('fs');
        fs.writeFileSync('./'+name+'.xml', rootQuery.toString());
}
        
}