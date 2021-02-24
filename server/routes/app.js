var express = require('express');
var router = express.Router();
const path = require("path");

// Get an array of all countries for construction of dropdown menu
// If this is a production build, serve the static website on /
if (process.env.NODE_ENV != "development") {
    router.use(express.static(path.join(__dirname, "../../frontend/build")));
    router.get("/", (req, res) => {
      res.sendFile("../frontend/build/index.html", { root: global });
    });
  }
  
  // If this is a dev build, say hi
  else{
    router.get("/", (req, res) => {
      res.send("Vidas wishes you a nice day!");
    });
  }
  
module.exports = router;
