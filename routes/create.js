var express = require('express');
var router = express.Router();
var utility = require('utility');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('view');
});

router.post('/', function(req, res) {
  return false;
  if (req.body.type == "gamebook") {
    if (utility.isAnyNullOrEmpty([req.body.title, req.body.author, req.body.description])) {
      console.log("Malformed POST to create, missing required fields.");
      res.redirect('view');
    }
    else {
      utility.createGameBook(req.body.title, req.body.author, req.body.description, function () {
        res.redirect('view');
      });
    }
  }
  else if (req.body.type == "page")
  {
    if (utility.isAnyNullOrEmpty([req.body.path, req.body.title, req.body.text, req.body.options, req.body.optionLinks])) {
      console.log("Malformed POST to create, missing required fields.");
      res.redirect('view');
    }
    else {
      var json = {};
      json.title = req.body.title;
      json.text = req.body.text;
      json.options = [];
      try {
        var options = JSON.parse(req.body.options);
        var optionLinks = JSON.parse(req.body.optionLinks);
        for (var i = 0; i < Math.min(options.length, optionLinks.length); i += 1)
        {
          json.options.push({text: options[i], link: optionLinks[i]});
        }
        utility.createPage(req.body.path, JSON.stringify(json), function () {
          res.redirect('back');
        });
      }
      catch (err)
      {
        console.log("Could not parse user input regarding list of options for a page, " + err);
        res.redirect('back');
      }
    }
  }
});

module.exports = router;
