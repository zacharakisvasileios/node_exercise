const controller = require("../controllers/messages");
const router = require("express").Router();

router.post("/feedDB", controller.feedDB); // /users/:userId
router.post("/create", controller.createMessage); // /users
router.put("/update/:messageId", controller.updateMessage); // /updateMessage/:userId
router.get("/", controller.getMessages); // /TODO add params

module.exports = router;
