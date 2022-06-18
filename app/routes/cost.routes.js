module.exports = app => {
    const costs = require("../controllers/cost.controller");
  
    var router = require("express").Router();
  
    // Create a new Cost
    router.post("/", costs.create);

    // Find Costs by category
    router.get("/:category", costs.FindByCategory);
  
    app.use("/api/costs", router);
  };
  