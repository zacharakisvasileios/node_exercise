const controller = require("../controllers/users");
const router = require("express").Router();

// CRUD Routes /users
router.get("/user", controller.getUsers);
router.get("/user/get/messageExchange", controller.getUserMessageExchange);
router.get("/user/get/conversationList", controller.getUserConversationList);

module.exports = router;
