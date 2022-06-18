module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: Number,
        first_name: String,
        last_name: String,
        birthday: Date,
        marital_status: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };
  