const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addFriend,
  generateQRCode,
  getUserByEmail,
  sendEmail,
  getOTPById,getUserById
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/addfriend").put(protect, addFriend);
router.route("/").post(registerUser);
router.route("/verify").post(sendEmail);
router.route("/verify/:id").post(getOTPById);
router.post("/login", authUser);
router.post("/:email", getUserByEmail);
router.post("/:id", getUserById);
router.post("/:userId/qrcode", generateQRCode);

module.exports = router;
