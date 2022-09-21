import { MoonIcon, PhoneIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  IconButton,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSender, getSenderInfo } from "../logic/ChatLogic";
import { ChatState } from "../providers/ChatProvider";
import MessageZone from "./MessageZone";
var selectedChatCompare;
function ChatZone() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue(
    "linear(to-b,#1E2B6F,#193F5F)",
    "linear(to-b,white,#B1AEC6)"
  );
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [hoverring, setHoverring] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      //socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to send message",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);
  return (
    <Box
      w={"full"}
      h="full"
      bgImage={
        selectedChat
          ? selectedChat.isGroupChat === true
            ? selectedChat.chatAdmin.pic
            : `url(${getSenderInfo(user, selectedChat.users).pic})`
          : "initial"
      }
      bgColor={useColorModeValue(
        "linear(to-b,white,#B1AEC6)",
        "linear(to-b,#1E2B6F,#193F5F)"
      )}
      bgRepeat="no-repeat"
      bgPosition={"center"}
      bgSize="cover"
      position="relative"
    >
      {!selectedChat ? (
        <Box
          boxSize="full"
          backdropFilter="auto"
          backdropBlur="100px"
          display={"flex"}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="3xl" textColor={"whiteAlpha.900"}>
            CHOOSE A CHAT TO GET START{" "}
          </Text>
        </Box>
      ) : (
        <>
          <Box
            justifyContent="space-between"
            display={"flex"}
            position="absolute"
            boxSize="full"
            backdropFilter="auto"
            backdropBlur="100px"
          >
            {loading ? (
              <Spinner size="xl" w={20} h={20} alignSelf="center" m="auto" />
            ) : (
              <Box
                display="flex"
                justifyContent={"flex-end"}
                overflowY="scroll"
                width="100%"
                flexDir="column"
                style={{
                  scrollbarWidth: "none",
                }}
              >
                {selectedChat && (
                  /**user badge */
                  <Box
                    display={"flex"}
                    alignItems="center"
                    position="absolute"
                    top={5}
                    left={10}
                    bgGradient={bgColor}
                    minW="300"
                    w="fit-content"
                    p={2}
                    borderRadius="full"
                    textColor={
                      colorMode === "light"
                        ? "whiteAlpha.900"
                        : "blackAlpha.900"
                    }
                  >
                    <Avatar
                      name={
                        selectedChat.isGroupChat
                          ? selectedChat.chatName
                          : getSender(user, selectedChat.users)
                      }
                      src={getSenderInfo(user, selectedChat.users).pic}
                      mr={3}
                    >
                      <AvatarBadge
                        boxSize={5}
                        bg="green.500"
                        borderColor={
                          colorMode === "light" ? "darkblue" : "white"
                        }
                      ></AvatarBadge>
                    </Avatar>
                    <Text fontWeight={"bold"}>
                      {selectedChat.isGroupChat
                        ? selectedChat.chatName
                        : getSender(user, selectedChat.users)}
                      {selectedChat.isGroupChat && (
                        <Text fontWeight={"normal"}>
                          {selectedChat.users.length} members
                        </Text>
                      )}
                    </Text>
                  </Box>
                )}
                {/** button change theme*/}
                <Box position="absolute" top={7} right={10}>
                  <IconButton
                    variant={"ghost"}
                    className="transition-opacity"
                    borderRadius="full"
                    bgColor="transparent"
                    _hover={{
                      color: "black",
                    }}
                    icon={
                      colorMode === "light" ? (
                        <PhoneIcon textColor={"white"} />
                      ) : (
                        <PhoneIcon textColor={"yellow"} />
                      )
                    }
                  />
                  <IconButton
                    variant={"ghost"}
                    bgGradient={
                      colorMode === "light"
                        ? "linear(to-b,#1E2B6F,#193F5F)"
                        : "linear(to-b,#C39A9E,#808293)"
                    }
                    className="transition-opacity"
                    borderRadius="full"
                    onClick={toggleColorMode}
                    _hover={{
                      color: "black",
                    }}
                    icon={
                      colorMode === "light" ? (
                        <MoonIcon textColor={"white"} />
                      ) : (
                        <SunIcon textColor={"yellow"} />
                      )
                    }
                  />
                </Box>

                <MessageZone messages={messages} />
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default ChatZone;
