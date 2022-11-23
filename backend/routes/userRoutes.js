const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addFriend,
<<<<<<< HEAD
  generateQRCode,
  getUserByEmail,reserPassword,
  sendEmail,
  getOTPById, getUserById,
  update,forgotPassword
=======
  update,
  getUserByEmail,
  generateQRCode,
  getUserByEmailForLogin,
  getUserByUsernameForLogin,
  getUserById,
>>>>>>> a8051d6d529d7fb914e19211093dc7eb41657401
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/addfriend").put(protect, addFriend);
router.route("/").post(registerUser);
router.post("/login", authUser);
<<<<<<< HEAD
router.post("/:email", getUserByEmail);
router.post("/:id", getUserById);
router.post("/:userId/qrcode", generateQRCode);
router.post("/forgot-password/:userId",forgotPassword);
router.post("/forgot-password/:userId/reset",reserPassword);

=======
>>>>>>> a8051d6d529d7fb914e19211093dc7eb41657401
router.route("/update").put(protect, update);
router.post("/:email", getUserByEmail);

router.post("/checkemail/:email", getUserByEmailForLogin);
router.post("/checkusername/:username", getUserByUsernameForLogin);

router.post("/:userId/qrcode", generateQRCode);
router.get("/:userId/id", getUserById);
module.exports = router;
