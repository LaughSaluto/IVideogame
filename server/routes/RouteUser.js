const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const auth = require("../middleware/auth");

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);
router.get("/info", auth, UserController.info);
router.put("/updateUserNonAdmin", auth, UserController.updateUserNonAdmin);
router.get("/getUser", auth, UserController.getUser);

router.delete("/deleteUser/:id", auth, UserController.deleteUser);
router.put("/updateUser/:id", auth, UserController.updateUser);

module.exports = router;
