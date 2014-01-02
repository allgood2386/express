
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

exports.bloglist = function (db) {
    return function(req, res) {
        var collection = db.get('blog');
        collection.find({}, {}, function(e, docs){
            res.render('bloglist', {
                "bloglist" : docs
            });
        });
    };
};

exports.newuser = function(req, res) {
    res.render('newuser', { title: 'Add New User'});
};

exports.newpost = function(req, res) {
    res.render('newpost', {title: 'New Blog Post'});
}

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}

exports.addpost = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var title = req.body.title;
        var body = req.body.body;

        // Set our collection
        var collection = db.get('blog');

        // Submit to the DB
        collection.insert({
            "title" : title,
            "body" : body
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("blogs");
                // And forward to success page
                res.redirect("blogs");
            }
        });

    }
}