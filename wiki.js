// Wiki route module-all wiki-related routes in one file and have them accessed with a route prefix of /wiki/
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.send('Wiki home page');
});

router.get('/about', function(req, res) {
	res.send('About Wiki');
});

module.exports = router;
