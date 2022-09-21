import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";

import moment from "moment";
import { ChatState } from "../providers/ChatProvider";
import axios from "axios";
import { getSender } from "../logic/ChatLogic";

function ChatList({ fetchAgain, setfetchAgain }) {
  const [loggedUser, setLoggedUser] = useState(null);

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      //get req
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load chats",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);
  return (
    <VStack zIndex={1} mb={5}>
      {chats.map((chat) => (
        <Box
          key={chat._id}
          className="transition-opacity"
          _hover={{
            opacity: loggedUser?._id !== chat.users[1]._id ? "0.80" : "1",
          }}
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
          <Avatar
            size={"md"}
            name={
              chat.isGroupChat
                ? chat.chatName
                : loggedUser._id && getSender(loggedUser, chat.users)
            }
          >
            <AvatarBadge
              boxSize={5}
              bg="green.500"
              borderColor={"white"}
            ></AvatarBadge>
          </Avatar>

          <Box>
            <Text fontWeight={"bold"} textColor={"black"}>
              {chat.isGroupChat
                ? chat.chatName
                : getSender(loggedUser, chat.users)}
            </Text>
            <Text
              textColor={"black"}
              w="180px"
              textOverflow={"ellipsis"}
              overflow="hidden"
              whiteSpace={"nowrap"}
            >
              {chat.latestMessage?.content === undefined ? (
                <Text color={"GrayText"} className="italic">
                  {"Chat something 🥺"}
                </Text>
              ) : chat.isGroupChat ? (
                chat.latestMessage &&
                `@${chat.latestMessage?.sender.username}: ${chat.latestMessage?.content} `
              ) : (
                `${
                  getSender(loggedUser, chat.users) === user.name
                    ? "You: " + chat.latestMessage?.content
                    : chat.latestMessage?.content
                }`
              )}{" "}
            </Text>
          </Box>
          <Text
            bgClip={"text"}
            fontSize="12"
            bgGradient="linear(to-br,blue.900,blue.800)"
            textAlign={"right"}
            w="80px"
          >
            {moment(chat.latestMessage?.createdAt).calendar()}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export default ChatList;
