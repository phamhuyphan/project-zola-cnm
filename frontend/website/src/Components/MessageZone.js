import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../providers/ChatProvider";
import MessageBadge from "./MessageBadge";

function MessageZone() {
  const { selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      <VStack display={"flex"} w="67.77%" h="100vh" p={2}>
        <MessageBadge />
      </VStack>
    </>
  );
}

export default MessageZone;
