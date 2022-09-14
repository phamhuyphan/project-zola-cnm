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


router.route("/").get(accessPost);
router.route("/create").post(createPost);
router.route("/update").put(updatePost);
router.route("/delete").delete(deletePost);
router.route("/like").put(likePost);

module.exports = router;

