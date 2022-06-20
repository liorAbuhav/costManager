module.exports = app => {
    const costs = require("../controllers/cost.controller");
  
    var router = require("express").Router();
  
    // Create a new Cost
    router.post("/", costs.create);

    // Find Costs by category
    router.get("/:category", costs.FindByCategory);

    // Find Costs by category
    router.get("/:year/:month", costs.FindByMonth);
  
    app.use("/api/costs", router);
  };
  