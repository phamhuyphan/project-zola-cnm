const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    isRead: { type: Boolean, default: false },

    content: { type: String, trim: true },

    multiMedia: { type: Array, trim: true, default: "" },

    multiVideo: { type: Array, trim: true, default: "" },

    multiFile: {type:Array,trim: true, default: ""},

    response: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;