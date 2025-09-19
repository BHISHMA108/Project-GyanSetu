const express = require("express");
const chatBotfunction = require("../controllers/chatController.js")
const route = express.Router();

route.post("/chatbot" , chatBotfunction);


export default route;