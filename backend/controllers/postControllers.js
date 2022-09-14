const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")
const Comment = require("../models/commentModel")

const accessPost = asyncHandler(async (req, res) => {
    res.json(Post.find())
})

const createPost = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the field" });
    }

    var users = JSON.parse(req.body.users);
  
    if (users.length < 2) {
      return res.status(400).send("More than two users required");
    }

    users.push(req.user);

    var createPost = await Post.create({
        content: req.body.content,
        pic:req.body.pic,
        sender:req.user
    })

    if(createPost){
        res.json(createPost);
    }else{
        res.status(404);
        throw new Error(`Create not su`);
    }

})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    var deletePost = await Post.deleteOne(postId)
    if(deletePost){
        res.send("delete "+postId)
    }else{
        res.status(404);
        throw new Error(`Delete not su`);
    }

})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    var update = Post.findByIdAndUpdate(postId,{
        content: req.body.content,
        pic:req.body.pic
    })

    if(update){
        res.json(update)
    }else{
        res.status(404);
        throw new Error(`Delete not su`);
    }
})

const likePost = asyncHandler(async (req, res) => {

})



