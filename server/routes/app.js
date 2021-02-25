var express = require('express');
var router = express.Router();
const path = require("path");

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
      res.send("You probably meant to go to localost:3000. Try that instead:) -V");
    });
  }
  
module.exports = router;
