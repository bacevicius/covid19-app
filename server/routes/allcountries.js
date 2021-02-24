var express = require('express');
var router = express.Router();

// Get an array of all countries for construction of dropdown menu
router.get("/", (req, res) => {
    const distinctCountries = [...new Set(global.data.map((item) => item.country))];
    res.send(distinctCountries);
  });
  
module.exports = router;
