var db = require("../models");

module.exports = function(app) {
  // Get all persons in photolibraries table in db

  app.get("/api/photolibraries", function(req, res) {
    db.photolibraries.findAll({}).then(function(dbPhotoLibrary) {
      // results are available to us inside the .then
      res.json(dbPhotoLibrary);
    });
  });

  // Create a new user add to photolibraries table in db
  app.post("/api/photolibraries", function(req, res) {
    db.photolibraries.create(req.body).then(function(dbPhotoLibrary) {
      res.json(dbPhotoLibrary);
    });
  });
};
