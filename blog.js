exports.getBlogList = function(db) {
    var collection = db.get('blog');
    var result = collection.find();
    return result.toArray();
}