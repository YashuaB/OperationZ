var db = require("../models");
var passport = require("passport")
var jwt = require("jsonwebtoken")
var passportJWT = require("passport-jwt")
var ExtractJwt = passportJWT.ExtractJwt;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'hihihi';

module.exports = function(app){

  var createUser = async ({ username, password, email }) => {
    return await db.Accounts.create({ username, password ,email});
  };

  var getAllUsers = async () => {
    return await db.Accounts.findAll();
  };
  
  var getUser = async obj => {
    return await db.Accounts.findOne({
      where: obj,
    });
  };
  
  
  app.get('/users', function(req, res) {
    getAllUsers().then(user => res.json(user));
  });
  
  
  app.post('/register', function(req, res, next) {
    var { username, password, email } = req.body;
    createUser({ username, password , email}).then(user =>
      res.json({ user, msg: 'account created successfully' })
    );
  });
  
  
  app.post('/login', async function(req, res, next) {
    var { username, password , email } = req.body;
    if (username && password && email) {
      var user = await getUser({ username: username });
      if (!user) {
        res.status(401).json({ message: 'No such user found' });
      }
      if (user.password === password) {
        
        var payload = { id: user.id };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token });
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    }
  });
  
 
  app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json('Success! You can now see this without a token.');
  });
}

