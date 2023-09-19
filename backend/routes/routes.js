const messageController = require("../controllers/messages");
const userController = require("../controllers/users");
const router = require("express").Router();

router.post("/feedDB", messageController.feedDB);
router.post("/message/create", messageController.createMessage);
router.put("/message/update/:messageId", messageController.updateMessage);
router.post("/message/get/all", messageController.getMessages);
router.post("/message/clear", messageController.deleteAllMessages);

// CRUD Routes /users
router.get("/user", userController.getUsers);
router.get("/user/get/messageExchange", userController.getUserMessageExchange);
router.get(
  "/user/get/conversationList",
  userController.getUserConversationList,
);

module.exports = router;
