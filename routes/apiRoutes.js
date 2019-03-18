var db = require("../models");
console.log("Models are: " + db);
module.exports = function(app) {
  // Get all faces

  app.get("/api/photolibraries", function(req, res) {
    // Finding all Chirps, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    db.photolibraries.findAll({}).then(function(dbPhotoLibrary) {
      // results are available to us inside the .then
      res.json(dbPhotoLibrary);
      console.log(dbPhotoLibrary);
    });
  });

  // Create a new example
  app.post("/api/photolibraries", function(req, res) {
    db.photolibraries.create(req.body).then(function(dbPhotoLibrary) {
      res.json(dbPhotoLibrary);
    });
  });

  // // Delete faces by id
  // app.delete("/api/faces/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbFaces
  //   ) {
  //     res.json(dbFaces);
  //   });
  // });
};
