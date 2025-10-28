const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team.controller");

router.get("/", teamController.getAll);
router.get("/:id", teamController.getById);
router.post("/", teamController.create);
router.put("/:id", teamController.update);
router.delete("/:id", teamController.delete);

module.exports = router;
