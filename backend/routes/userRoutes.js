const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addFriend,
  reInfor,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/addfriend").put(protect, addFriend);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/reinfor").put(protect, reInfor);

module.exports = router;
