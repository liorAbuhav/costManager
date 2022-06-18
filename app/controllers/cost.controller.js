const BSON = require('bson');
const db = require("../models");
const Cost = db.costs;

// Create and Save a new Cost
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Cost
  const cost = new Cost({
    user_id: BSON.ObjectId(req.body.user_id),
    description: req.body.description,
    category: req.body.category,
    sum: req.body.sum
  });

  // Save Tutorial in the database
  cost
    .save(cost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cost."
      });
    });
};

// Find Costs by category
exports.FindByCategory = (req, res) => {
    const category = req.params.category;
    Cost.find({category: category})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
};
