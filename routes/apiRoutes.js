var db = require("../models");

module.exports = function(app) {
  // Find all Authors and return them to the user with res.json
  app.get("/api/product/category/:category?", function(req, res) {

    if(req.params.category){
      db.Products.findAll({
        where: {
          category: req.params.category
        }
      }).then(function(dbProducts) {
        res.json(dbProducts);
      });
    }else{db.Products.findAll({}).then(function(dbProducts) {
      res.json(dbProducts);
    });}
    
  });

  app.get("/api/product/subcategory/:subcategory?", function(req, res) {

    if(req.params.subcategory){
      db.Products.findAll({
        where: {
          subcategory: req.params.subcategory
        }
      }).then(function(dbProducts) {
        res.json(dbProducts);
      });
    }else{db.Products.findAll({}).then(function(dbProducts) {
      res.json(dbProducts);
    });}
    
  });

  app.get("/api/product/subcategoryext/:subcategoryext?", function(req, res) {
    if(req.params.subcategoryext){
      db.Products.findAll({
        where: {
          subcategoryext: req.params.subcategoryext
        }
      }).then(function(dbProducts) {
        res.json(dbProducts);
      });
    }else{db.Products.findAll({}).then(function(dbProducts) {
      res.json(dbProducts);
    });}
    
  });



  
//route to specifically get rating
  // app.get("/api/review/:rating", function(req, res) {
  //   // Find one Author with the id in req.params.id and return them to the user with res.json
  //   db.Review.findOne({
  //     where: {
  //       id: req.params.rating
  //     }
  //   }).then(function(dbReview) {
  //     res.json(dbReview);
  //   });
  // });

  app.post("/api/review", function(req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.Review.create(req.body).then(function(dbReview) {
      res.json(dbReview);
    });
  });


  app.get("/api/userLogin", function(req, res){
    db.UserLogin.findAll({}).then(function(UserLogin){
      res.json(UserLogin)
    })
  })

  app.post("/api/userLogin", function(req, res){
    db.UserLogin.create(req.body).then(function(dbUserLogin){
      res.json(dbUserLogin)
    })
  })

  app.get("/api/userWatched", function(req,res){
    db.UserWatchedVid.findAll({}).then(function(UserWatchedVid){
      res.json(UserWatchedVid)
    })
  })


  // app.delete("/api/authors/:id", function(req, res) {
  //   // Delete the Author with the id available to us in req.params.id
  //   db.Author.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

};