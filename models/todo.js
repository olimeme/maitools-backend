var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: {
    type: String,
    required: [true, "title not provided"],
  },
  description: {
    type: String,
    required: [true, "description not provided"],
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    required: [true, "status not provided"],
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Todo", todoSchema);
