// *********************************************************************************
// htmlRoutes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Main route for home page 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../ScrapperMongoDB/public/index.html"));
});

// Route to redirect to html of Saved Articles 
app.get("/saved_articles", function(req, res) {
  res.sendFile(path.join(__dirname, "../ScrapperMongoDB/public/saved_articles.html"));
});

}





