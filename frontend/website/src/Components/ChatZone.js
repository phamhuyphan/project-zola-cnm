import {
  ChevronLeftIcon,
  MoonIcon,
  PhoneIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Lottie from "react-lottie";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { getSender, getSenderInfo } from "../logic/ChatLogic";
import { ChatState } from "../providers/ChatProvider";
import MessageList from "./MessageList";

import animationData from "../animations/52671-typing-animation-in-chat.json";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ProfileModal from "./ProfileModal";
const ENDPOINT = "http://localhost:5000";

let socket, selectedChatCompare;
function ChatZone({ fetchAgain, setFetchAgain }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue(
    "linear(to-b,white,#B1AEC6)",
    "linear(to-b,#1E2B6F,#193F5F)"
  );
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [hoverring, setHoverring] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
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
      socket.emit("join chat", selectedChat._id);
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
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      setFetchAgain(!fetchAgain);
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        console.log(data);
        setMessages([...messages, data]);
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
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    //if user is typing
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timerDiff = timeNow - lastTypingTime;
      if (timerDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  console.log(notification);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <Box
      w="full"
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
            position="relative"
            boxSize="full"
            backdropFilter="auto"
            backdropBlur="600px"
          >
            {loading ? (
              <Spinner size="xl" w={20} h={20} alignSelf="center" m="auto" />
            ) : (
              <Box
                display="flex"
                justifyContent={"flex-end"}
                pos={"absolute"}
                width="100%"
                height="100%"
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
                    <IconButton
                      bg="white"
                      ml={5}
                      mr={2}
                      my={2}
                      w="30px"
                      h="30px"
                      borderRadius="full"
                      display={{ base: "flex", md: "none" }}
                      icon={<ChevronLeftIcon />}
                      size="12px"
                      onClick={() => setSelectedChat("")}
                    />
                    <Avatar
                      name={
                        selectedChat.isGroupChat
                          ? selectedChat.chatName
                          : getSender(user, selectedChat.users)
                      }
                      src={getSenderInfo(user, selectedChat.users).pic}
                      mr={3}
                    >
                      {selectedChat.isGroupChat === false && (
                        <AvatarBadge
                          boxSize={5}
                          bg="green.500"
                          borderColor={
                            colorMode === "light" ? "white" : "darkblue"
                          }
                        ></AvatarBadge>
                      )}
                    </Avatar>
                    <Text
                      fontWeight={"bold"}
                      textColor={colorMode === "light" ? "black" : "white"}
                    >
                      {selectedChat.isGroupChat ? (
                        <div
                          onMouseEnter={() => setHoverring(true)}
                          onMouseLeave={() => setHoverring(false)}
                        >
                          <UpdateGroupChatModal
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                            fetchMessages={fetchMessages}
                          >
                            <Text _hover={{ textDecor: "underline" }}>
                              {selectedChat.chatName}
                            </Text>
                          </UpdateGroupChatModal>
                        </div>
                      ) : (
                        <>
                          <ProfileModal
                            user={getSenderInfo(user, selectedChat.users)}
                          >
                            {getSender(user, selectedChat.users)}
                          </ProfileModal>
                        </>
                      )}
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
                      colorMode === "dark" ? (
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

                <MessageList messages={messages} />

                <FormControl
                  onKeyDown={sendMessage}
                  isRequired
                  bottom={0}
                  left={0}
                  p={5}
                  pos="absolute"
                >
                  {isTyping ? (
                    <Box
                      w="fit-content"
                      border={"1px solid black"}
                      display="flex"
                    >
                      <Lottie
                        width={40}
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: animationData,
                          rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice",
                          },
                        }}
                        style={{
                          marginBottom: 15,
                          marginLeft: 0,
                        }}
                      />
                      <Text textColor={"white"} mixBlendMode={"difference"}>
                        someone is typing
                      </Text>
                    </Box>
                  ) : (
                    <></>
                  )}
                  <InputGroup size="lg" marginY={4}>
                    <Input
                      variant="filled"
                      rounded={"full"}
                      bg="white"
                      filter="invert(1)"
                      placeholder="Type something..."
                      value={newMessage}
                      onChange={typingHandler}
                    />
                    <InputRightElement width="4.5rem">
                      <Text
                        className={`shadow-md
                      ${
                        colorMode === "light"
                          ? "text-darkblue bg-gradient-to-bl from-white to-[#B1AEC6]"
                          : "text-white bg-gradient-to-tr from-[#1E2B6F] to-[#193F5F]"
                      }
                      rounded-full text-3xl w-8 h-8  hover:bg-opacity-50`}
                      >
                        <i
                          class="fa fa-paper-plane"
                          aria-hidden="true"
                          onClick={sendMessage}
                        ></i>
                      </Text>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default ChatZone;
