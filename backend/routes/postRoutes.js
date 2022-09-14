const express = require("express");
const {
    accessPost,
    createPost,
    deletePost,
    updatePost,
    likePost
  } = require("../controllers/postControllers")
  const { protect } = require("../middleware/authMiddleware")

  const router = express.Router();


router.route("/").get( accessPost);
router.route("/").post( createPost);
router.route("/").put( updatePost);
router.route("/").delete( deletePost);
router.route("/like").put( likePost);

module.exports = router;

