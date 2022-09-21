import { Avatar, Box, Text, Tooltip, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUserMargin,
} from "../logic/ChatLogic";
import moment from "moment";
import { ChatState } from "../providers/ChatProvider";
import ScrollableFeed from "react-scrollable-feed";

function MessageZone({ messages }) {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Box key={m._id} style={{ display: "flex" }}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={m.sender.name}
                hasArrow
                placeContent="bottom-start"
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  my="auto"
                  mr={2}
                  name={m.sender.name}
                  src={m.sender.pic}
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
                maxWidth: "100%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUserMargin(messages, m, i, user._id) ? 0 : 10,
              }}
            >
              <Tooltip
                label={moment(m.createdAt).calendar()}
                hasArrow
                placeContent="left-end"
              >
                {m.content}
              </Tooltip>
            </span>
          </Box>
        ))}
    </ScrollableFeed>
  );
}

export default MessageZone;
