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
screeningToDb : function(config, data, doneCallback) {
    var sql = require('mssql'); 

    var connection = new sql.Connection(config.connection, function(err) {
        if (err) console.log(err);

        var request = new sql.Request(connection); // or: var request = connection.request();
 
    if (config.target.clean) {
        console.log('cleaning up ' + config.target.name);
        request.query('delete from ' + config.target.name, function(err) {
            if (err) doneCallback(err);
            insertRecursive(request, data, connection, config.target, 0, doneCallback);
        })
    } else {
        insertRecursive(request, data, connection, config.target, 0, doneCallback);
        
    }

    function insertRecursive(request, data, connection, config, count, doneFunc) {
        var mappedEntity = mapToSqlParam(data[count]);
        if (mappedEntity.indexOf('NaN') > 0)
            console.log('ERROR: ' + mappedEntity);
        var query = 'insert into ' + config.name + ' values ('+mappedEntity+')';
        request.query(query, function(err, recordset) {
            if (err) doneFunc(err);
            if (count === (data.length - 1)) {
                connection.close();
                doneFunc();
            } else {
                var newCount = count + 1;
        
                insertRecursive(request, data, connection, config, newCount, doneFunc);
            }      
        });
    }


    function performInsert(request, data, connection, config, doneFunc) {
        data.forEach(function(elm, index) {

        var mappedEntity = mapToSqlParam(elm);
        var query = 'insert into ' + config.name + ' values ('+mappedEntity+')';
        request.query(query, function(err, recordset) {
            if (index === (data.length-1)) {
                setTimeout(function() {
                    connection.close();
                    doneFunc();
                }, 5000)

      }          
        
        });
        });
        request.on('done', function(returnValue) {

        });

        
    }

    function mapToSqlParam(elm) {
        return  '\'' + elm.time + 
                '\',\'' + elm.screeningLine + 
                '\','+ Math.round(elm.insert) + 
                ',' + Math.round(elm.standby) + 
                ',' + Math.round(elm.fault) + 
                ',' + Math.round(elm.calibration) + 
                ',' + Math.round(elm.screen);
    }

        
    

    // Stored Procedure
/*
    var request = new sql.Request(connection);
    request.input('input_parameter', sql.Int, 10);
    request.output('output_parameter', sql.VarChar(50));
    request.execute('procedure_name', function(err, recordsets, returnValue) {
        // ... error checks

        console.dir(recordsets);
    });
*/
    });
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