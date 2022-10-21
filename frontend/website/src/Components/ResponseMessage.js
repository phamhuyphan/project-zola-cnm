/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ChatState } from "../providers/ChatProvider";
import { MessageState } from "../providers/MessagesProvider";

function ResponseMessage({ setResponseMessageID }) {
  const { responseMessage, setResponseMessage } = MessageState();
  const { selectedChat, user } = ChatState();

  useEffect(() => {
    setResponseMessageID(responseMessage);
  }, [responseMessage]);

  useEffect(() => {
    setResponseMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  return (
    responseMessage && (
      <Box
        pos="absolute"
        bg="gray.500"
        zIndex={10}
        top={-10}
        right={10}
        p={2}
        borderTopRadius={"xl"}
      >
        <Box color={"white.500"} display="flex">
          <Text fontWeight={"bold"}>
            {(responseMessage.sender._id !== user._id
              ? "@" + responseMessage?.sender.username
              : "You") + ": "}
          </Text>
          <Text className="truncate" maxW={"200px"} mx={1}>
            {responseMessage.content}
          </Text>
        </Box>
      </Box>
    )
  );
}

export default ResponseMessage;
