var express = require('express');
var router = express.Router();

// Rest api endpoint to get covid data by country
router.get("/", (req, res) => {
    // Get the required country through the api parameter
    let country = req.query.country;
  
    // Filter the data array by the country
    let countryArray = data.filter(function (el) {
      return el.country === country;
    });
  
    function constructArray(array) {
      let cases = [];
      let deaths = [];
  
      // Go through the country data array and split it into cases and deaths arrays
      array.map((item) => {
        if (item.indicator === "cases") {
          cases.push(item);
        } else deaths.push(item);
      });
  
      //Modify the cases array so that it contains the weekly case count and death count
      cases.map(function (item, index) {
        item["death_count"] = deaths[index].weekly_count;
        item["case_count"] = item.weekly_count;
      });
  
      // Keep only the essential data we need for the graph
      let keys_to_keep = ["country", "year_week", "death_count", "case_count", "population"];
  
      let essentialData = (arr) =>
        arr.map((o) =>
          keys_to_keep.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
          }, {})
        );
  
      return essentialData(cases);
    }
  
    const finalArray = constructArray(countryArray);
  
    res.send(finalArray);
  });
  
module.exports = router;
