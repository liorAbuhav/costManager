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
        else {
            // Existing category
            // updated = {...data[0]._doc};

            // Category.findByIdAndUpdate(data[0]._doc._id, updated, { useFindAndModify: false })
            // .then(data => {
            // if (!data) {
            //     throw "Some error occurred while creating the Category."
            // } else  "Category was updated successfully.";
            // })
            // .catch(err => {
            //     throw "Error updating Category with id=" + id
            // });

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
