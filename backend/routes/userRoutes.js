const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addFriend,
  generateQRCode
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect,allUsers);
router.route("/addfriend").put(protect,addFriend);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/:userId/qrcode",generateQRCode);

module.exports = router;
