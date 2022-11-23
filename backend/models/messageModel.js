const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    isRead: { type: Boolean, default: false },
<<<<<<< HEAD

    content: { type: String, trim: true },

    multiMedia: { type: Array, trim: true, default: "" },

    multiVideo: { type: Array, trim: true, default: "" },

    multiFile: {type:Array,trim: true, default: ""},

    response: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
=======

    multiMedia: { type: String, default: "" },

    multiVideo: { type: String, default: "" },

    multiFile: { type: String, default: "" },

    content: { type: String, trim: true },

    response: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
>>>>>>> a8051d6d529d7fb914e19211093dc7eb41657401
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
