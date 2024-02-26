const SpacedRepDeck = require("../models/spaced-rep-deck");
const { SpacedRepCard } = require("../models/spaced-rep-card");

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

exports.createCard = (req, res, next) => {
  const card = new SpacedRepCard({
    front: req.body.front,
    back: req.body.back,
    deckId: req.body.deckId,
    nextReviewDate: new Date(),
  });

  const deck = SpacedRepDeck.findById(req.body.deckId);

  if (!deck) {
    res.status(404).send({
      message: "Deck not found",
    });
  }
  deck.cards.push(card);
  deck.save().catch((err) => {
    res.status(500).send({
      message: err.message,
    });
  });
};

exports.updateCard = (req, res, next) => {
  SpacedRepCard.findByIdAndUpdate(
    req.body.cardId,
    {
      front: req.body.front,
      back: req.body.back,
    },
    { new: true }
  )
    .then((card) => {
      req.card = card;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.deleteCard = (req, res, next) => {
  SpacedRepCard.findByIdAndDelete(req.body.cardId)
    .then((card) => {
      req.card = card;
      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
