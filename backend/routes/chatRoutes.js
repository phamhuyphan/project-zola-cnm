const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post( accessChat);
router.route("/").get( fetchChats);
router.route("/group").post( createGroupChat);
router.route("/rename").put( renameGroupChat);
router.route("/groupremove").put( removeFromGroup);
router.route("/groupadd").put( addToGroup);

module.exports = router;