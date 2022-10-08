const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected

const allMessages = asyncHandler(async (req, res) => {

  let messagePage = 20; // số lượng messagemessage xuất hiện trên 1 page
  let page = req.params.page || 1;
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username pic email")
      .populate("chat");
      // .skip((messagePage * page) - messagePage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      // .limit(messagePage)
      // .exec((err, message) => {
      //   Message.countDocuments((err, count) => { // đếm để tính xem có bao nhiêu trang
      //     if (err) return next(err);
      //     res.render('product/index_product', {
      //       message, // message trên một page
      //       current: page, // page hiện tại
      //       pages: Math.ceil(count / messagePage) // tổng số các page
      //     });
      //   });
      // });
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

    message = await message.populate("sender", "username pic");
    message = await (await message.populate("chat")).populate("response");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username pic email fullname",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.body
  Message.findByIdAndUpdate(messageId, { content: "deleted" }).then((message) => { res.send(message) })
})

module.exports = { allMessages, sendMessage, deleteMessage };
