var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

// Blog Schema
var Blog = new Schema({
	title		: {type: String, default : '', required: true},
	body		: {type: String, default : ''}
});

mongoose.model('Blog',Blog);

var Blog = exports.Blog = mongoose.model('Blog');

