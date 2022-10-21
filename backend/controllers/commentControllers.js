const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const { request } = require("express");
const { mongo } = require("mongoose");
const e = require("express");
const { validate } = require("../models/userModel");

const getAllComments = asyncHandler(async (req, res) => {
    await Comment.find({ post: req.params.postId }).populate('sender', '-password').populate('post').then(data => {
        let result = data
        res.json(result)
    }).catch(error => {
        res.status(400).send(error.message || error);
    })

})


const createComment = asyncHandler(async (req, res) => {
    Comment.create({
        sender: req.user._id,
        content: req.body.content,
        post: req.body.postId
    }).populate('sender', '-password').populate('post').then(data => {
        let result = data
        res.json(result)
    }).catch(error => {
        res.status(400).send(error.message || error)
    })

})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params.commentId;
    const content = req.body.content;
    Post.findById(req.params.postId).lean()
        .then(() => {
            return Comment.findByIdAndUpdate(req.params.commentId, {
                content,
            }, { new: true }).lean();
        }).then((updatecomment) => {
            res.json(updatecomment);
        }).catch(error => {
            res.send(error)
        })

})


const deleteComment = asyncHandler(async (req, res) => {
    Comment.deleteOne({ id: req.params.commentId }).then((data) => {
        res.send(data)
    }).catch(error => {
        res.send(error)
    })

})

const feedbackNewComment = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    let post;
    Post.findById(req.params.postId).lean()
        .then((p) => {
            post = p;
            return Comment.findById(req.params.commentId).lean();
        })
        .then((comment) => {
            res.render('replies-new', { post, comment, currentUser });
        })
        .catch((err) => {
            console.log(err.message);
        });
})

const feedbackComment = asyncHandler(async (req, res) => {
    const reply = new Comment(req.body);
    reply.author = req.user._id;
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId)
        .then((post) => {
            // FIND THE CHILD COMMENT
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId),
            ])
                .then(([reply, comment]) => {
                    // ADD THE REPLY
                    comment.comments.unshift(reply._id);
                    return Promise.all([
                        comment.save(),
                    ]);
                })
                .then(() => res.redirect(`/posts/${req.params.postId}`))
                .catch(console.error);
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save();
        });
})

module.exports = {
    getAllComments,
    createComment,
    deleteComment,
    updateComment,
    feedbackComment,
    feedbackNewComment
}