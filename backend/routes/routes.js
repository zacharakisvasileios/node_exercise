const messageController = require("../controllers/messages");
const userController = require("../controllers/users");
const router = require("express").Router();

router.post("/feedDB", messageController.feedDB);
router.post("/message/create", messageController.createMessage);
router.post("/message/update/:messageId", messageController.updateMessage);
router.post("/message/get/all", messageController.getMessages);
router.post("/message/clear", messageController.deleteAllMessages);

// CRUD Routes /users
router.post("/user", userController.getUsers);
router.post("/user/get/messageExchange", userController.getUserMessageExchange);
router.post(
  "/user/get/conversationList",
  userController.getUserConversationList,
);

module.exports = router;
