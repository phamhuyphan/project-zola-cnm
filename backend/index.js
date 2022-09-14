const express = require('express')
const app = new express()
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
connectDB();

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commetRoutes");


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.listen(3000,()=>{
    console.log("Server start http://127.0.0.1:3000");
})
