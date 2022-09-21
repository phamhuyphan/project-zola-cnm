import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function MessageBadge({ messenge }) {
  return (
    <Box zIndex={-1} display="flex" w={"100%"}>
      <Avatar src={messenge.sender.pic}></Avatar>
      <Box bgColor={"whiteAlpha.800"} p="10px" rounded={"2xl"}>
        <Text textColor={"blackAlpha.900"}>{messenge.content}</Text>
      </Box>
    </Box>
  );
}

export default MessageBadge;
