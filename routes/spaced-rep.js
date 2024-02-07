var express = require("express"),
  router = express.Router(),
  verifyToken = require("../middlewares/authJWT");
const {
  getAllDecks,
  createDeck,
  updateDeck,
  deleteDeck,
} = require("../controllers/spaced-rep.controller");

router.get(
  "/spaced-rep/get-deck",
  verifyToken,
  getAllDecks,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Decks fetched successfully",
    });
  }
);

router.post(
  "/spaced-rep/create-deck",
  verifyToken,
  createDeck,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Deck created successfully",
      deck: req.deck,
    });
  }
);

router.put(
  "/spaced-rep/update-deck",
  verifyToken,
  updateDeck,
  function (req, res) {}
);

router.delete(
  "/spaced-rep/delete-deck",
  verifyToken,
  deleteDeck,
  function (req, res) {
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Deck deleted successfully",
    });
  }
);

// router.get("/spaced-rep/get-cards", verifyToken, function (req, res) {});

module.exports = router;
