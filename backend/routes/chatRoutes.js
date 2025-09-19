const express = require("express");
const chatBotFunction = require("../controllers/chatController.js");

const router = express.Router();

router.post("/chatbot", chatBotFunction);

module.exports = router;
