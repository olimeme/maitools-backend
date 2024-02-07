const mongoose = require("mongoose");

// Define the Card schema
const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    default: 1, // Represents the current repetition interval, initially set to 1 (in days)
  },
  nextReviewDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
});

// Define the Card model
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
