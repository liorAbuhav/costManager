const { ObjectId } = require("bson");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: ObjectId,
        description: String,
        category: String,
        sum: Number,
        date: Date
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, ...object } = this.toObject();
      return object;
    });
  
    const Cost = mongoose.model("cost", schema);
    return Cost;
  };
  