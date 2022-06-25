module.exports = app => {
    const costs = require("../controllers/cost.controller");
  
    var router = require("express").Router();
  
    // Create a new Cost
    router.post("/", costs.create);

    // Find all Costs
    router.get("/", costs.findAll);

    // Find Costs by category
    router.get("/category/:category", costs.FindByCategory);

    // Find Costs by year and month
    router.get("/date/:year/:month", costs.FindByMonth);

    // Find Costs by year and month
    router.get("/dateAndUser/:id/:year/:month", costs.FindByUserAndMonth);

    // Find Costs by id
    router.get("/user/:id", costs.FindByUser);

    // Update a Cost with id
    router.put("/:id", costs.update);

    // Delete a Cost with id
    router.delete("/:id", costs.delete);
  
    app.use("/api/costs", router);
  };
  