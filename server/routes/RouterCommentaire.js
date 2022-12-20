const express = require("express");
const router = express.Router();

const CommentaireController = require("../Controllers/CommentaireController");
const auth = require("../middleware/auth");

router.post("/addCommentaire", auth, CommentaireController.addCommentaire);
router.get("/getCommentaire", auth, CommentaireController.getCommentaire);
router.get("/getAllCommentaire", CommentaireController.getAllCommentaire);

router.get(
  "/getCommentairebyIDgame/:id",
  CommentaireController.getCommentairebyIDgame
);
router.put(
  "/updateCommentaire/:id",
  auth,
  CommentaireController.updateCommentaire
);
router.delete(
  "/deleteCommentaire/:id",
  auth,
  CommentaireController.deleteCommentaire
);

module.exports = router;
