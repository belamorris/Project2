var db = require("../models");

module.exports = function(app) {
  // Get all faces
  app.get("/api/faces", function(req, res) {
    db.Faces.findAll({}).then(function(dbFaces) {
      res.json(dbFaces);
    });
  });

  // Create a new example
  app.post("/api/faces", function(req, res) {
    db.Faces.create(req.body).then(function(dbFaces) {
      res.json(dbFaces);
    });
  });

  // Delete faces by id
  app.delete("/api/faces/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbFaces) {
      res.json(dbFaces);
    });
  });
};
