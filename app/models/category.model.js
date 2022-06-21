const { ObjectId } = require("bson");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
          name: String
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, ...object } = this.toObject();
      return object;
    });
  
    const Category = mongoose.model("category", schema);
    return Category;
  };
  