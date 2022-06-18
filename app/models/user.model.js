module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: String,
        first_name: String,
        last_name: String,
        birthday: Date,
        marital_status: String
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };
  