var express = require('express');
var router = express.Router();
var utility = require('utility');

/* GET home page. */
router.get('/', function(req, res, next) {
    utility.getGameBookListing(function(gameBookListing) {
        res.render('view', { title: utility.pageTitle, gameBookListing: gameBookListing });
    });
});

module.exports = router;
