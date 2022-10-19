const express = require("express");
const {
    getAllComments,
    createComment,
    deleteComment,
    updateComment,
    feedbackComment,
    feedbackNewComment
} = require("../controllers/commentControllers");
const { sendMessage } = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/:postId").get(protect, getAllComments);
router.route("/").post(protect, createComment);
router.route("/").delete(protect, deleteComment);
router.route("/:postId/comments/:commentId/updatecmt").put(protect,updateComment)
router.route("/:postId/comments/:commentId/replies/new").post(protect,feedbackNewComment);
router.route("/:postId/comments/:commentId/replies").post(protect,feedbackComment);

module.exports = router;