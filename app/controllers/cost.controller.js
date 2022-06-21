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

  // Save Cost in the database
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

// Retrieve all Usres from the database.
exports.findAll = (req, res) => {  
  Cost.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving costs."
      });
    });
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

// Find Costs by user
exports.FindByUser = (req, res) => {
  const userId = req.params.id;
  Cost.find({user_id: BSON.ObjectId(userId)})
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

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Cost.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cost with id=${id}. Maybe Cost was not found!`
        });
      } else res.send({ message: "Cost was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cost with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cost.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Cannot delete Cost with id=${id}. Maybe Cost was not found!`
        });
    } else {
        res.send({
        message: "Cost was deleted successfully!"
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Could not delete Cost with id=" + id
    });
    });
};

