const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controller");

router.get("/", boardController.getAll);
router.get("/:id", boardController.getById);
router.post("/", boardController.create);
router.put("/:id", boardController.update);
router.delete("/:id", boardController.delete);

module.exports = router;
