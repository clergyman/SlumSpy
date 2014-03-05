
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

exports.buildingslist = function(db) {
    return function(req, res) {
        var collection = db.get('buildingcollection');
        collection.find({},{},function(e,docs){
            res.render('buildingslist', {
                "buildingslist" : docs
            });
        });
    };
};

exports.newbuilding = function(req, res){
  res.render('newbuilding', { title: 'Add New Building' });
};

exports.addbuilding = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var bBorough = req.body.borough;
        var bStreet = req.body.street;
        var bNumber = req.body.number;
        var bCorpus = req.body.corpus;
        var bLongitude = req.body.lon;
        var bLatitude = req.body.lat;

        // Set our collection
        var collection = db.get('buildingcollection');

        // Submit to the DB
        collection.insert({
            "borough" : bBorough,
            "street" : bStreet,
            "number" : bNumber,
            "corpus" : bCorpus,
            "loc" : {
                "lon" : bLongitude,
                "lat" : bLatitude
            }
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("buildingslist");
                // And forward to success page
                res.redirect("buildingslist");
            }
        });

    }
}


