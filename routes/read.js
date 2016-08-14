var express = require('express');
var router = express.Router();
var utility = require('utility');

/* GET home page. */
router.get('/', function(req, res, next) {
  var path = req.query.path;

  if (path == null)
  {
    res.redirect('view');
  }
  else
  {
    var path = path.replace("'", "").replace('"', '');
    var gameBookId = path.split('/')[0];
    if (req.query.view == 1) {
      utility.incrementGameBookViews(gameBookId, function () {});
    }
    utility.getGameBookById(gameBookId, function(gameBook) {
      utility.getPage(path, function(pageJSON) {
        try {
          var page = JSON.parse(pageJSON.json);
          res.render('read', { title: utility.pageTitle, gameBook:gameBook, pageTitle: page.title, pageText: page.text, pageOptions: page.options });
        }
        catch (err)
        {
          console.log("Error when parsing input regarding page paths.");
          res.redirect('back');
        }
      });
    });
  }

  /*
  var urlSegments = req.originalUrl.split('/');
  var gameBookId = urlSegments.length < 3 ? null : urlSegments[3].replace('?', '');
  if (gameBookId == null)
  {
    console.log("No gamebook id specified in GET, redirecting to view.");
    res.redirect('view');
  }
  else
  {
    utility.incrementGameBookViews(gameBookId, function() {

    });
    utility.getGameBookById(gameBookId, function(gameBook) {
      res.render('read', { title: utility.pageTitle, gameBook: gameBook });
    });
  }
  */
});

module.exports = router;
