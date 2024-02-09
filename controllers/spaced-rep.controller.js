const SpacedRepDeck = require("../models/spaced-rep-deck");

// create spaced rep deck controller that contains spaced rep cards
exports.getAllDecks = (req, res) => {
  SpacedRepDeck.find({
    userId: req.user.id,
  })
    .populate("cards")
    .then((decks) => {
      if (decks.length === 0) {
        res.status(404).send({
          message: "No decks found",
        });
      }
      res.status(200).send({
        decks: decks,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.createDeck = (req, res, next) => {
  const deck = new SpacedRepDeck({
    deckName: req.body.deckName,
    cards: [],
    userId: req.user.id,
  });

  console.log(deck);

  deck
    .save()
    .then((deck) => {
      req.deck = deck;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.updateDeck = (req, res, next) => {
  SpacedRepDeck.findByIdAndUpdate(
    req.body.deckId,
    {
      deckName: req.body.deckName,
    },
    { new: true }
  )
    .then((deck) => {
      req.deck = deck;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.deleteDeck = (req, res, next) => {
  SpacedRepDeck.findByIdAndDelete(req.body.deckId)
    .then((deck) => {
      req.deck = deck;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
