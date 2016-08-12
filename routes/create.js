var express = require('express');
var router = express.Router();
var utility = require('utility');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('view');
});

router.post('/', function(req, res) {
  if (req.body.title == null || req.body.title == "" || req.body.author == null || req.body.author == "" || req.body.description == null || req.body.description == "")
  {
    console.log("Malformed POST to create, missing required fields.");
    res.redirect('view');
  }
  else {
    utility.createGameBook(req.body.title, req.body.author, req.body.description, function() {
      res.redirect('view');
    });
  }
});

module.exports = router;
