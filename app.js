var express = require('express');

var 	app = express.createServer(),
	models = require('./model.js');
	
	Blog = models.Blog;

app.set('view engine', 'jade');


app.get('/',function(req,res){
	res.render('index',{title:'Test',content:'What'});
});

app.listen(3000);

