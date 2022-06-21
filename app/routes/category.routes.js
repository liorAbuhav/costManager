module.exports = app => {
    const categories = require("../controllers/category.controller");
  
    var router = require("express").Router();

    // Retrieve all Users
    router.get("/", categories.findAll);
  
    app.use("/api/categories", router);
  };
  