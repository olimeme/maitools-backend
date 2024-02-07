var express = require("express"),
  router = express.Router(),
  verifyToken = require("../middlewares/authJWT");
spacedRepController = require("../controllers/spaced-rep.controller");

router.get(
  "/spaced-rep",
  verifyToken,
  spacedRepController.getAllCards,
  function (req, res) {
    console.log(req.user);
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      cards: req.cards,
    });
  }
);

router.post(
  "/spaced-rep",
  verifyToken,
  spacedRepController.createCard,
  function (req, res) {
    console.log(req.user);
    if (!req.user) {
      res.status(403).send({
        message: "Invalid JWT token",
      });
    }
    res.status(200).send({
      message: "Card created successfully",
    });
    console.log(req.cards);
  }
);

module.exports = router;
