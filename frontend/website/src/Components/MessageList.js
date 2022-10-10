import React from "react";
import ScrollableFeed from "react-scrollable-feed";

import MessageItem from "./MessageItem";

function MessageList({ messages }) {
  return (
    <ScrollableFeed className="pb-32 pt-16 px-4 w-full scrollbar-thin scroll-smooth">
      {messages &&
        messages.map((m, i) => (
          <MessageItem key={m._id} messages={messages} m={m} i={i} />
        ))}
    </ScrollableFeed>
  );
}
export default MessageList;
