const BSON = require('bson');
const db = require("../models");
const Cost = db.costs;
const categories = require("../controllers/category.controller");


// Create and Save a new Cost
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Cost
  costData = {
    user_id: BSON.ObjectId(req.body.user_id),
    description: req.body.description,
    category: req.body.category,
    sum: req.body.sum,
    date: new Date(req.body.date)
  }
  const cost = new Cost(costData);

  // Save Tutorial in the database
  cost
    .save(cost)
    .then(data => {
        // Add cost's category
        categories.create(costData)
        
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cost."
      });
    });

    // categories.create(costData).catch(err => {
    //     res.status(500).send({err})
    // });
};

// Find Costs by category
exports.FindByCategory = (req, res) => {
    const category = req.params.category;
    Cost.find({category: category})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Cost with category " + category });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Cost with category=" + category });
      });
};

// Find Costs by month
exports.FindByMonth = (req, res) => {
    const pYear = +req.params.year;
    const pMonth = +req.params.month;

    Cost.aggregate(
        [
          {
            $project: {
                _id: 1,
                user_id: 1,
                description: 1,
                category: 1,
                sum: 1,
                date: 1,
                year: { $year: "$date" },
                month: { $month: "$date" }
            }
          },
          {
            $match: {
                year: pYear,
                month: pMonth
            }
          },
          {
            $project: {
                year: 0,
                month: 0
            }
          }
        ]
     ).then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Cost with month and year "});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Cost with month and year"});
      });
};
