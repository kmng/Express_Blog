var express = require('express');

var 	app = express.createServer(),
	models = require('./model.js');
	
	Blog = models.Blog;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


app.get('/',function(req,res){
	res.render('index',{title:'Test',content:'Blog Listing is in '});
});

app.get('/blogs', function(req, res){
  Blog.find({}, function(err, docs) {
    res.render('blogs/index', {
      title: 'List of Blogs',
      blogs: docs
    });
  });
});

// New blog
app.get('/blogs/new', function(req, res){
  res.render('blogs/new', {
    title: 'New Blog'
  });
});

// Create/Update Blog
app.post('/blogs', function(req, res){
  if(req.body.blog._id)
    Blog.findOne({_id:req.body.blog._id}, function(err, a) {
      a.title = req.body.blog.title;
      a.body = req.body.blog.body;
      a.save(function(err) {
        console.log(err);
      })
    });
  else {
    blog = new Blog(req.body.blog);
    blog.save(function(err){
      console.log("Created");
    });
  }

  res.redirect('/blogs');

});

app.listen(3000);

