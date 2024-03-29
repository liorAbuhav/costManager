const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.costs = require("./cost.model.js")(mongoose);
db.categories = require("./category.model.js")(mongoose)

module.exports = db;
