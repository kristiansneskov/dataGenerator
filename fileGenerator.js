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
            item.ele('SummaryTimeStart', elm.time);
            item.ele('ScreeningLine', elm.screeningLine);
            item.ele('DurationInsert', elm.insert.toString().replace(".",","));
            item.ele('DurationStandby', elm.standby.toString().replace(".",","));            
            item.ele('DurationFault', elm.fault.toString().replace(".",","));
            item.ele('DurationCalibration', elm.calibration.toString().replace(".",","));
            item.ele('DurationScreening', elm.screen.toString().replace(".",","));
        });
        var fs = require('fs');
        fs.writeFileSync('./'+name+'.xml', rootQuery.toString());
},
smdAsXml : function(name, data) {
    var xmlBuilder = require('xmlbuilder');
        var rootQuery = xmlBuilder.create('Query');
        var xmlData = rootQuery.ele('XmlData');
        var root = xmlData.ele('items');
        //console.log(data);
        data.forEach(function(elm) {
            var item = root.ele('data');
            item.ele('Time', elm.time);
            item.ele('ScreeningLine',elm.screeningLine);
            item.ele('ScreeningMachineResultValid',1);
            item.ele('ScreeningMachineResultRejectPercent', (elm.reject/100).toString().replace(".",","));
            item.ele('ScreeningMachineResultUnanalyzedPercent', (elm.unanalyzed/100).toString().replace(".",","));            
            item.ele('ScreeningMachineResultClearPercent', (elm.clear/100).toString().replace(".",","));
            item.ele('IntervalCount', data.length);
        });
        var fs = require('fs');
        fs.writeFileSync('./'+name+'.xml', rootQuery.toString());
},
sodtAsXml : function(name, data) {
    var xmlBuilder = require('xmlbuilder');
        var rootQuery = xmlBuilder.create('Query');
        var xmlData = rootQuery.ele('XmlData');
        var root = xmlData.ele('items');
        //console.log(data);
        data.forEach(function(elm) {
            var item = root.ele('data');
            item.ele('dtMinute', elm.time);
            item.ele('ScreeningLine',elm.screeningLine);
            item.ele('ScreeningOfficerDecisionTimeValid',1);
            item.ele('ID_0_30_', (elm.region1/100).toString().replace(".",","));
            item.ele('ID_30_45_', (elm.region2/100).toString().replace(".",","));
            item.ele('ID_45_60_', (elm.region3/100).toString().replace(".",","));
            item.ele('ID_60_90_', (elm.region4/100).toString().replace(".",","));
            item.ele('ID_90_120_', (elm.region5/100).toString().replace(".",","));
            item.ele('ID_120_', (elm.region6/100).toString().replace(".",","));
            item.ele('Unknown', '0,0');
            item.ele('IntervalCount', data.length);
        });
        var fs = require('fs');
        fs.writeFileSync('./'+name+'.xml', rootQuery.toString());
},
sodAsXml : function(name, data) {
    var xmlBuilder = require('xmlbuilder');
        var rootQuery = xmlBuilder.create('Query');
        var xmlData = rootQuery.ele('XmlData');
        var root = xmlData.ele('items');
        //console.log(data);
        data.forEach(function(elm) {
            var item = root.ele('data');
            item.ele('Time', elm.time);
            item.ele('ScreeningLine',elm.screeningLine);
            item.ele('ScreeningOfficerResultValid',1);
            item.ele('ScreeningOfficerResultRejectPercent', (elm.reject/100).toString().replace(".",","));
            item.ele('ScreeningOfficerResultTimeoutPercent', (elm.timeout/100).toString().replace(".",","));            
            item.ele('ScreeningOfficerResultClearPercent', (elm.clear/100).toString().replace(".",","));
            item.ele('IntervalCount', data.length);
        });
        var fs = require('fs');
        fs.writeFileSync('./'+name+'.xml', rootQuery.toString());
}
        
}