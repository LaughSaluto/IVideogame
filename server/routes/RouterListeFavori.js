const express = require("express");
const router = express.Router();

const ListeFavoriController = require("../Controllers/ListeFavoriController");
const auth = require("../middleware/auth");

router.post("/addFavori", auth, ListeFavoriController.addFavori);
router.get("/getListeFavori", auth, ListeFavoriController.getListeFavori);

router.delete("/deleteFavori/:id", auth, ListeFavoriController.deleteFavori);

module.exports = router;
