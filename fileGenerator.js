module.exports = {

asXml : function(name, data) {
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
}
        
}