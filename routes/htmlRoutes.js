var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Faces.findAll({}).then(function(dbFaces) {
      res.render("index", {
        msg: "Welcome!",
        facesdb: dbFaces
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/facesdb/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbFaces
    ) {
      res.render("facesdb", {
        facesdb: dbFaces
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
