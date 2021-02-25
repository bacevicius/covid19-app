const express = require("express");
const app = express();
const unirest = require("unirest");
const port = 3001;

// Create the global data object where we store the covid data once when we create the server
// Dirty, but that's what the assignment requires
global.data = [];

// Define all the routes our express sever will use
const main = require("./routes/app");
const country = require("./routes/country");
const allCountries = require("./routes/allcountries");

app.use("/", main);
app.use("/country", country);
app.use("/allcountries", allCountries);

// Do this when creating the server
app.listen(port, () => {
  console.log("Fetching data from covid API...");

  //Do a get request to the required API and get the covid data
  const request = unirest.get(
    "https://opendata.ecdc.europa.eu/covid19/nationalcasedeath/json/"
  );

  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    // Parse the response json data and save it in a global data object
    data = JSON.parse(JSON.stringify(response.body));
    console.log("Data fetched successfully.");

    // Say where the server is listening on the production build
    if (process.env.NODE_ENV != "development") {
      console.log(`App listening at http://localhost:${port}`);
      console.log(
        "If this is a dockerized instance, the app will probably be listening on a different port. Please check which port you exposed when running the docker container."
      );
    }
  });
});
