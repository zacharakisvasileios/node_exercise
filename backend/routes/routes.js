const messageController = require("../controllers/messages");
const userController = require("../controllers/users");
const router = require("express").Router();

router.post("/feedDB", messageController.feedDB);

router.post("/message/create", messageController.createMessage);
router.put("/message/update/:id", messageController.updateMessage);
router.get(
  "/message/:id?/:content?/:sender?/:receiver?/:seen?",
  messageController.getMessages,
);
// not requested, used for development
router.post("/message/clear", messageController.deleteAllMessages);

router.get("/user/messages/:userA/:userB", userController.getUserMessages);
router.get("/user/conversationList", userController.getUserConversationList);
// not requested, used for development
router.get(
  "/user/messagesList",
  userController.getUserConversationListMessages,
);
router.get(
  "/user/:id?/:firstName?/:surname?/:dateOfBirth?/:sex?/:username?",
  userController.getUsers,
);
module.exports = router;
