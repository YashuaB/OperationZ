var express = require("express");
var jwt = require("jsonwebtoken")
var passport = require("passport")
var passportJWT = require("passport-jwt")
var session = require('express-session')

var app = express();
var PORT = process.env.PORT || 8080;


var db = require("./models");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'hihihi';

// vars create our strategy for web token
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);


app.use(passport.initialize());

// parse application/json

// app.use(session({
//   secret: "test",
//   resave: true,
//   saveUninitialized: true
// }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));


require("./routes/apiRoutes")(app);
require("./routes/loginRoute")(app);
require("./routes/cartRoutes")(app)
// require("./routes/users")(app);
// require("./routes/checkoutRoutes")(app);
// require("./routes/clearRoutes")(app);
require("./routes/htmlRoutes")(app);


db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
