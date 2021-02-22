const express = require("express");
const app = express();
const unirest = require("unirest");
const port = 3001;

// Create the global data object where we store the data once when we create the server
var data;

app.get("/allcountries", (req, res) => {
  // Get an array of all countries for construction of dropdown menu
  const distinctCountries = [...new Set(data.map((item) => item.country))];
  res.send(distinctCountries);
});

// Rest api endpoint to get covid data by country
app.get("/country", (req, res) => {
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
    cases.map(function(item, index) {
      item["death_count"] = deaths[index].weekly_count;
      item["case_count"] = item.weekly_count;
    });

    // Keep only the essential data we need for the graph
    let keys_to_keep = ["country", "year_week", "death_count", "case_count"];

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

// Do this when creating the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);

  //Do a get request to the required API and get the covid data
  const request = unirest.get(
    "https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json/"
  );

  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    // Parse the response json data and save it in a global data object
    data = JSON.parse(JSON.stringify(response.body));
    console.log("Data fetched successfully");
  });
});
