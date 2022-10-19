import React, { memo } from "react";
import ScrollableFeed from "react-scrollable-feed";

import MessageItem from "./MessageItem";

function MessageList({ messages, setMessages, setResponseMessageID }) {
  console.log("MessageList is rendered");
  return (
    <ScrollableFeed className="pb-32 pt-16 px-4 w-full scrollbar-thin scroll-smooth">
      {messages &&
        messages.map((m, i) => (
          <MessageItem
            key={m._id}
            setMessages={setMessages}
            messages={messages}
            m={m}
            i={i}
            setResponseMessageID={setResponseMessageID}
          />
        ))}
    </ScrollableFeed>
  );
}
export default memo(MessageList);
