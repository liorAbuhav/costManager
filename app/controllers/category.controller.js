const BSON = require('bson');
const db = require("../models");
const Category = db.categories;

// Create and Save a new Category
exports.create = (cost) => {
  // Validate request
  if (!cost.category) {
      throw "Content can not be empty!"
  }

  Category.find({name: cost.category})
  .then(data => {
      console.log(data);
        if (data.length === 0) {
            // Category not exists

            // Create a Category
            const category = new Category({
                name: cost.category
            });

            // Save Category in the database
            category
                .save(category)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    throw "Some error occurred while creating the Category.";
                });
        }
  })
  .catch(err => {
    throw "Error retrieving Category"
  });
};

// Retrieve all Usres from the database.
exports.findAll = (req, res) => {  
    Category.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });
};
