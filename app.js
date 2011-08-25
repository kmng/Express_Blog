

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
  app.use(express.session({secret:' keyboard cat' }));
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
        req.session.start = 'start';
        console.log(req.session);
	res.render('index',{title:'Test',content:'Blog Listing is in '});
});

app.get('/blogs', function(req, res){
  console.log(req.session);
  Blog.find({}, function(err, docs) {
    res.render('blogs/index', {
      title: 'List of Blogs',
      blogs: docs,
      message : req.session.start
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

// View a blog
app.get('/blogs/:id', function(req, res){
  Blog.findOne({_id:req.params.id}, function(err,blog){
    res.render('blogs/show', {
      title: blog.title,
      blog: blog.doc
    });
  });
});

// Edit a blog
app.get('/blogs/:id/edit', function(req, res){
  Blog.findOne({_id:req.params.id}, function(err,blog){
    res.render('blogs/edit', {
      title: 'Edit '+blog.doc.title,
      blog: blog.doc
    });
  });
});

// Delete a blog
app.del('/blogs/:id', function(req, res){
  Blog.findOne({_id:req.params.id}, function(err,blog){
    blog.remove(function(err){
      console.log(err);
    });
  });
  res.redirect('/blogs');
});


app.listen(3000);
console.log("Express server listening on port %d", app.address().port)
