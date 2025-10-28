const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;
