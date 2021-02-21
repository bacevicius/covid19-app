const express = require("express");
const app = express();
const unirest = require("unirest");
const port = 3001;

// Create the global data object where we store the data once when we create the server
var data;
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
