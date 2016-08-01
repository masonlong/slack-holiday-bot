var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var bodyParser = require("body-parser");

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/today', function(request, response){
    var url = 'http://www.checkiday.com/api/3/?d=today';

    http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var holidayResponse = JSON.parse(body);
        var holidayArray = [];
        for(var i = 0; i < holidayResponse.holidays.length; i++){
            var dayString = holidayResponse.holidays[i].name;
            holidayArray.push(dayString);
        };
        var finalVal = holidayArray.toString().replace(/,/g, "\n");
        console.log("Got a response: ", holidayResponse);
        response.json({
          'response_type': 'in_channel', 
          'text': 'These are the holidays today', 
          'attachments': [{
          'text': 'hey'
          }]
        });
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});


app.listen(4268);
console.log('The app is running on port 4268');
