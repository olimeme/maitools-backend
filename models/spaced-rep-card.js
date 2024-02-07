const mongoose = require("mongoose");

// Define the Card schema
const cardSchema = new mongoose.Schema({
  //create card schema that contains front, back, the deck in which the card belongs to, the next review date, created date, and updated date
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  deckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SpacedRepDeck",
    required: true,
  },
  nextReviewDate: {
    type: Date,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

// Define the Card model
const SpacedRepCard = mongoose.model("SpacedRepCard", cardSchema);

module.exports = SpacedRepCard;
