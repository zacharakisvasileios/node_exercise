const messageController = require("../controllers/messages");
const userController = require("../controllers/users");
const router = require("express").Router();

router.post("/feedDB", messageController.feedDB);
router.post("/message/create", messageController.createMessage);
router.put("/message/update/:messageId", messageController.updateMessage);
router.get("/message/all", messageController.getAllMessages);
router.post("/message/clear", messageController.deleteAllMessages);

// CRUD Routes /users
router.get("/user", userController.getUsers);
router.get("/user/all", userController.getAllUsers);
router.get("/user//messageExchange", userController.getUserMessageExchange);
router.get("/user/conversationList", userController.getUserConversationList);

module.exports = router;
