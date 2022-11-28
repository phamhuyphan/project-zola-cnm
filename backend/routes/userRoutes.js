const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addFriend,
  update,
  getUserByEmail,
  generateQRCode,
  getUserByEmailForLogin,
  getUserByUsernameForLogin,
  getUserById,
  forgotPassword,
  reserPassword,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/addfriend").put(protect, addFriend);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/update").put(protect, update);
router.post("/:email", getUserByEmail);

router.post("/checkemail/:email", getUserByEmailForLogin);
router.post("/checkusername/:username", getUserByUsernameForLogin);

router.post("/:userId/qrcode", generateQRCode);
router.get("/:userId/id", getUserById);
router.post("/forgot-password/:userId", forgotPassword);
router.post("/forgot-password/:userId/reset", reserPassword);
module.exports = router;
