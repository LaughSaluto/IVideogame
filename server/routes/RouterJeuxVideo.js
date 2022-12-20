const express = require("express");
const router = express.Router();

const JeuxVideoController = require("../controllers/JeuxVideoController");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/addGame", auth, multer, JeuxVideoController.addGame);
router.get("/getAllGame", JeuxVideoController.getAllGame);

router.get("/getGame/:id", JeuxVideoController.getGame);
router.delete("/deleteGame/:id", auth, JeuxVideoController.DeleteGame);
router.put("/updateGame/:id", auth, multer, JeuxVideoController.updateGame);

module.exports = router;
