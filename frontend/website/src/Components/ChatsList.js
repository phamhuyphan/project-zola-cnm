import React, { useContext, useEffect } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { chatsData } from "../fakedata";
import { ChatState } from "../providers/ChatProvider";

function ChatList() {
  const { setChats, chats, setSelectedChat, selectedChat } = ChatState();
  useEffect(() => {
    if (chatsData.length > 0) setChats(chatsData);
    console.log(chats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack zIndex={1} mb={5}>
      {chats.map((chat) => (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor="pointer"
          bgColor={
            selectedChat
              ? selectedChat._id === chat._id
                ? "white"
                : "whiteAlpha.700"
              : "whiteAlpha.700"
          }
          position="relative"
          display="flex"
          alignItems={"center"}
          justifyContent="space-between"
          borderRadius={"full"}
          mt={3}
          w={350}
          p={2}
          mx={3}
        >
          <Avatar size={"md"} name={chat.chatName}>
            <AvatarBadge
              boxSize={5}
              bg="green.500"
              borderColor={"white"}
            ></AvatarBadge>
          </Avatar>

          <Box>
            <Text fontWeight={"bold"} textColor={"black"}>
              {chat.chatName}
            </Text>
            <Text
              textColor={"black"}
              w="200px"
              textOverflow={"ellipsis"}
              overflow="hidden"
              whiteSpace={"nowrap"}
            >
              You: Randomthings I love Mewo Mewo{" "}
            </Text>
          </Box>
          <Text
            bgClip={"text"}
            fontSize="12"
            bgGradient="linear(to-br,blue.900,blue.800)"
          >
            2 hours ago
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export default ChatList;
