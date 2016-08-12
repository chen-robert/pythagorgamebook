var express = require('express');
var router = express.Router();
var utility = require('utility');

/* GET home page. */
router.get('/', function(req, res, next) {
  var urlSegments = req.originalUrl.split('/');
  var gameBookId = urlSegments.length < 3 ? null : urlSegments[3].replace('?', '');
  if (gameBookId == null)
  {
    console.log("No gamebook id specified in GET, redirecting to view.");
    res.redirect('view');
  }
  else
  {
    utility.getGameBookById(gameBookId, function(gameBook) {
      res.render('edit', { title: utility.pageTitle, gameBook: gameBook });
    });
  }
});

module.exports = router;
