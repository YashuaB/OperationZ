var path = require("path");


module.exports = function(app) {

  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  
  app.get("/pageOne", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/pageOne.html"));
  });

 
  app.get("/pageTwo", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/pageTwo.html"));
  });

 

};
