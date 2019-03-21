require("dotenv").config();
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var exphbs = require("express-handlebars");

var db = require("./models");

// var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./public/js/facesRoute");
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


var clients = 0;
io.on("connection", function(socket) {
  clients++;
  io.sockets.emit("broadcast", {
    description: clients + " clients connected!"
  });
  socket.on("disconnect", function() {
    clients--;
    io.sockets.emit("broadcast", {
      description: clients + " clients connected!"
    });
  });
});


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  // io.on('connection', () => { console.log("a user is connected") })
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
