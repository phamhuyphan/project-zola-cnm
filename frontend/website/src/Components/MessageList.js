import { Avatar, Box, IconButton, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUserMargin,
} from "../logic/ChatLogic";
import moment from "moment";
import { ChatState } from "../providers/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";
import { DeleteIcon } from "@chakra-ui/icons";

function MessageList({ messages }) {
  const [isHover, setIsHover] = useState(false);

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
            zIndex={0}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={"@" + m.sender.username}
                hasArrow
                placeContent="bottom-start"
              >
                <Avatar
                  size="md"
                  showBorder={true}
                  cursor="pointer"
                  my="auto"
                  mr={2}
                  display={m.sender._id === user._id && "none"}
                  name={m.sender.username}
                  src={m.sender.pic}
                  marginTop={
                    isSameUserMargin(messages, m, i, user._id) ? 0 : 45
                  }
                />
              </Tooltip>
            )}

            <Box
              className="shadow-lg"
              display="flex"
              flexDirection="column"
              maxWidth="75%"
              w={"fit-content"}
              borderRadius="10px"
              backgroundColor={`${
                m.sender._id === user._id ? "#BEE3F8" : "whiteAlpha.900"
              }`}
              padding="10px"
              marginLeft={isSameSenderMargin(messages, m, i, user._id)}
              marginTop={
                isSameUserMargin(messages, m, i, user._id) ? "auto" : 30
              }
              position={"relative"}
            >
              <Text width={"fit-content"}>{m.content}</Text>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Text
                  width={"fit-content"}
                  fontSize={9}
                  marginLeft={0}
                  textColor={"blackAlpha.900"}
                >
                  {moment(m.createdAt).calendar()}
                </Text>
              )}
              <IconButton
                position="absolute"
                top={0}
                bottom={0}
                m={"auto 0"}
                borderRadius={"full"}
                right={m.sender._id === user._id ? "unset" : -16}
                left={m.sender._id === user._id ? -16 : "unset"}
                icon={<DeleteIcon fontSize={15} textColor={"whiteAlpha.800"} />}
              ></IconButton>
            </Box>
          </Box>
        ))}
    </ScrollableFeed>
  );
}

export default MessageList;
