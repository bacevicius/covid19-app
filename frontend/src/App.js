import "./App.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Chart from "./ChartComponent";

function App() {
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Lithuania");
  const [data, setData] = useState([{"population" :3000000}]);

  // This parses the list of all countries so it can be used with react-select
  const optionsParsed = countries.map((item) => ({ value: item, label: item }));

  // On dropdown change, save the country value
  function onDropdownChange(value) {
    if (value != null) {
      setCountry(value.value);
    }
  }

  //Fetch the covid data for whichever country we currently have in the memory (state)
  function fetchData(country) {
    fetch("/country" + "/?country=" + country)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {}
      );
  }

  // This useEffect executes once when the app is mounted
  // It fetches  the list of all countries to be used in the dropdown menu
  useEffect(() => {
    fetch("/allcountries")
      .then((res) => res.json())
      .then(
        (result) => {
          setCountries(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  // This useEffect executes every time the country is updated, it calls the covid data update function
  useEffect(() => {
    fetchData(country);
  },[country]);

  return (
    <div className="App">
      <body className="App-body">
        <h2>COVID-19 Weekly Statistics</h2>
        <h2>{country}</h2>
        <p>Population : {data[0].population.toLocaleString()}</p>
        <Chart className="chart" country={country} data={data} />
        <Select
          className="country-select"
          menuPlacement="top"
          openMenuOnClick={true}
          isClearable={true}
          placeholder="Type/Select a country"
          options={optionsParsed}
          onChange={onDropdownChange}
        />
      </body>
    </div>
  );
}

export default App;
