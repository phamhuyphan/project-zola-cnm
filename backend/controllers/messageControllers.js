const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected

const allMessages = asyncHandler(async (req, res) => {
  try {
    let messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username pic email")
      .populate("chat")
      .populate("response");
    messages = await User.populate(messages, {
      path: "response.sender",
      select: "username pic email fullname ",
    });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const pageMessages = asyncHandler(async (req, res) => {
  const limit = 20;
  const skip = Message.find({ chat: req.params.chatId }).length - 20;
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .limit(limit)
      .skip(skip)
      .populate("sender", "username pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, response } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    isRead: false,
    chat: chatId,
    response: response,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "username pic email");
    message = await message.populate("chat");
    message = await message.populate("response");
    message = await User.populate(message, {
      path: "response.sender",
      select: "username pic email fullname ",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
    console.log(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.body;
  Message.findByIdAndUpdate(messageId, { content: "deleted" }).then(
    (message) => {
      res.send(message);
    }
  );
});

module.exports = { allMessages, sendMessage, deleteMessage, pageMessages };
