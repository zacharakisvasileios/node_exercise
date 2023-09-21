const messageController = require("../controllers/messages");
const userController = require("../controllers/users");
const router = require("express").Router();

router.post("/feedDB", messageController.feedDB);
router.post("/message/create", messageController.createMessage);
router.put("/message/update/:id", messageController.updateMessage);
router.get("/message", messageController.getMessages);
router.post("/message/clear", messageController.deleteAllMessages);

router.get("/user", userController.getUsers);
router.get("/user/messages", userController.getUserMessages);
router.get("/user/conversationList", userController.getUserConversationList);

module.exports = router;
