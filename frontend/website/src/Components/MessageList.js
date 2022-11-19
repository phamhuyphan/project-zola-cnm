import React, { memo } from "react";
import ScrollableFeed from "react-scrollable-feed";

import MessageItem from "./MessageItem";

function MessageList({ messages, setMessages, pics, setPic }) {
  console.log("MessageList is rendered");
  return (
    <ScrollableFeed className="pb-32 pt-16 px-4 w-full scrollbar-thin scroll-smooth">
      {messages &&
        messages.map((m, i) => (
          <MessageItem
            key={m._id}
            setMessages={setMessages}
            messages={messages}
            pics={pics}
            setPic={setPic}
            m={m}
            i={i}
          />
        ))}
    </ScrollableFeed>
  );
}
export default memo(MessageList);
