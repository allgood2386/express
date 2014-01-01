var express = require('express');
var app = express();

var hbs = require('hbs');
var mongo = require('mongodb');
var monk = require('monk');


var db = monk('localhost:27017/express');

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

var blogEngine = require('./blog');

app.get('/', function(req, res) {
    res.render('index', {title:"My Blog",entries:blogEngine.getBlogList(db)});
});

app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

app.listen(3000);