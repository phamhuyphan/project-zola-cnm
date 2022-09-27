import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUserMargin,
} from "../logic/ChatLogic";
import moment from "moment";
import { ChatState } from "../providers/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";

function MessageList({ messages }) {
  const { user } = ChatState();
  return (
    <ScrollableFeed className="pb-32 pt-16 px-4 w-full scrollbar-thin scroll-smooth">
      {messages &&
        messages.map((m, i) => (
          <Box
            key={m._id}
            marginBottom={1}
            display="flex"
            textColor={"blackAlpha.900"}
            alignItems="center"
            position={"relative"}
            zIndex={-1}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={m.sender.name}
                hasArrow
                placeContent="bottom-start"
              >
                <Avatar
                  size="md"
                  cursor="pointer"
                  my="auto"
                  mr={2}
                  display={m.sender._id === user._id && "none"}
                  name={m.sender.name}
                  src={m.sender.pic}
                  marginTop={
                    isSameUserMargin(messages, m, i, user._id) ? 0 : 45
                  }
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "white"
                }`,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                padding: "5px 20px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUserMargin(messages, m, i, user._id) ? 5 : 30,
              }}
            >
              {m.content}
            </span>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Box
                position={"absolute"}
                bottom={"-25px"}
                right={m.sender._id === user._id ? "0" : "unset"}
                left={m.sender._id === user._id ? "unset" : "10"}
              >
                <Text
                  fontSize={14}
                  marginLeft={5}
                  textColor={"whiteAlpha.900"}
                  textShadow={"2px 2px #000"}
                >
                  {moment(m.createdAt).calendar()}
                </Text>
              </Box>
            )}
          </Box>
        ))}
    </ScrollableFeed>
  );
}

export default MessageList;
