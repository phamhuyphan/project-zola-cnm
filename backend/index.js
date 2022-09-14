const express = require("express");
const app = new express();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
connectDB();

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server start at", PORT);
});
