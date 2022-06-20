const { ObjectId } = require("bson");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
          name: String,
          count: Number,
          sum: Number
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      return object;
    });
  
    const Category = mongoose.model("category", schema);
    return Category;
  };
  