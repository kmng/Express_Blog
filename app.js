var express = require('express');

var app = express.createServer();

app.set('view engine', 'jade');


app.get('/',function(req,res){
	res.render('index',{title:'Test',content:'What'});
});

app.listen(3000);

