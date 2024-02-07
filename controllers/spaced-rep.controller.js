const SpacedRepCard = require("../models/spaced-rep-card");

// Create a new card
exports.createCard = (req, res) => {
  const card = new SpacedRepCard({
    front: req.body.front,
    back: req.body.back,
    nextReviewDate: req.body.nextReviewDate,
    userId: req.user.id,
  });

  card
    .save()
    .then((card) => {
      console.log(`Card created: \n\n ${card}`);
      res.status(200).send({
        message: "Card created successfully",
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err,
      })
    );
};

// Get all cards
exports.getAllCards = (req, res) => {
  SpacedRepCard.find({
    userId: req.user.id,
  })
    .then((cards) => {
      res.status(200).send({
        cards: cards,
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err,
      })
    );
};

// Get card by id
exports.getCardById = (req, res) => {
  SpacedRepCard.findById(req.params.cardId)
    .then((card) => {
      res.status(200).send({
        card: card,
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err,
      })
    );
};

// Update card by id
exports.updateCardById = (req, res) => {
  SpacedRepCard.findByIdAndUpdate(req.params.cardId, {
    front: req.body.front,
    back: req.body.back,
    nextReviewDate: req.body.nextReviewDate,
  })
    .then((card) => {
      res.status(200).send({
        message: "Card updated successfully",
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err,
      })
    );
};
