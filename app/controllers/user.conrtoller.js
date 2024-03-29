const BSON = require('bson');
const db = require("../models");
const User = db.users;
const Cost = db.costs;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  User.find({id: req.body.id})
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found Cost with category " + category });
    else {
      if (data.length === 0) {
        // create a new user

          // Create a User
          const user = new User({
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: Date(req.body.birthday),
            marital_status: req.body.marital_status
          });

          // Save User in the database
          user
            .save(user)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the User."
              });
            });
      }
      else {
        res
        .status(400)
        .send({ message: "Canno't create user with existed ID" });
      }
    };
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Cost with category=" + category });
  });
};

// Retrieve all Usres from the database.
exports.findAll = (req, res) => {  
    User.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
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

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};
  
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
const id = req.params.id;

User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
    } else {
        // remove related costs
        Cost.deleteMany({user_id: id})
        .then(data => {
          if (!data) {
              res.status(404).send({
              message: `Cannot delete Cost with id=${id}. Maybe Cost was not found!`
              });
          }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Cost with id=" + id
        });
        });


        res.send({
        message: "User was deleted successfully!"
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Could not delete User with id=" + id
    });
    });
};