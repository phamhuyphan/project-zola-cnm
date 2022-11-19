import {
  ChevronLeftIcon,
  MoonIcon,
  PhoneIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Box,
  Fade,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from 'react';
import EmojiPicker, { Theme } from "emoji-picker-react";
import DropZone from "react-dropzone";
import axios from "axios";
import Lottie from "react-lottie";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import { getSender, getSenderInfo } from "../logic/ChatLogic";
import { ChatState } from "../providers/ChatProvider";
import MessageList from "./MessageList";
import { motion } from "framer-motion";
import animationData from "../animations/52671-typing-animation-in-chat.json";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ProfileModal from "./ProfileModal";
import moment from "moment";
import MessagesProvider from "../providers/MessagesProvider";
import ResponseMessage from "./ResponseMessage";

const ENDPOINT = "http://localhost:5000";

let socket, selectedChatCompare;
function ChatZone({ fetchAgain, setFetchAgain }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue(
    "linear(to-b,whiteAlpha.900,#B1AEC6)",
    "linear(to-b,#1E2B6F,#193F5F)"
  );
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [responseMessageID, setResponseMessageID] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [pics, setPic] = useState();
  const [videos, setVideo] = useState();
  const [files, setFile] = useState();
  const toast = useToast();
  const { onToggle } = useDisclosure();
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const [toggle, setToggle] = useState(false);
  const fetchMessages = async () => {
    if (!selectedChat) return;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        cancelToken: source.token,
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      if (user) socket.emit("join chat", selectedChat._id);
    } catch (error) {
      if (axios.isCancel(error)) console.log("successfully aborted");
      else
        toast({
          title: "Error Occured",
          description: "Failed to send message",
          status: "warning",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
    }
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  };

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event === "Send") && newMessage) {
      if (user) socket.emit("stop typing", selectedChat._id);
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
            multiMedia: pics,
            multiVideo: videos,
            multiFile:files,
            content: newMessage,
            chatId: selectedChat._id,
            response: responseMessageID,
          },
          config
        );
        setPic("");
        setVideo("");
        setFile("")
        socket.emit("new message", data);
        console.log(data);
        setMessages([...messages, data]);
        setFetchAgain(!fetchAgain);
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

  const inputRef = useRef(null);

  const selectChange = (event) => {
    const pics = event.target.files[0];
    if (!pics) {
      return;
    }
    if (pics) {
      const data = new FormData();
      console.log(pics);
      data.append("file", pics);
      data.append("upload_preset", "chat-chit");
      data.append("cloud_name", "voluu");
      fetch("https://api.cloudinary.com/v1_1/voluu/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
          console.log(data.url.toString())
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }

  const handleFileChange = (event) => {
    const video = event.target.files[0];
    if (!video) {
      return;
    }
    if (video) {
      const data = new FormData();
      console.log(video);
      data.append("file", video);
      data.append("upload_preset", "chat-chit");
      data.append("cloud_name", "voluu");
      fetch("https://api.cloudinary.com/v1_1/voluu/video/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setVideo(data.url.toString());
          console.log(data);
          console.log(data.url.toString())
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }

  const selectChangeFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (file) {
      const data = new FormData();
      console.log(file);
      data.append("file", file);
      data.append("upload_preset", "chat-chit");
      data.append("cloud_name", "voluu");
      fetch("https://api.cloudinary.com/v1_1/voluu/raw/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setVideo(data.url.toString());
          console.log(data);
          console.log(data.url.toString())
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }

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
    if (user) {
      socket.emit("setup", user);
      socket.on("connected", () => {
        setSocketConnected(true);
      });
      socket.on("typing", () => {
        setIsTyping(true);
        onToggle();
      });
      socket.on("stop typing", () => {
        setIsTyping(false);
        onToggle();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    console.log("recieved");
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
  console.log("chatZone is rendered");
  return (
    <Box
      w="full"
      h="full"
      bgImage={
        selectedChat
          ? selectedChat.isGroupChat
            ? selectedChat.chatAdmin.pic
            : `url(${getSenderInfo(user, selectedChat.users).pic})`
          : "initial"
      }
      bgColor={useColorModeValue(
        "linear(to-b,whiteAlpha.900,#B1AEC6)",
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
          display="flex"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            mixBlendMode={"difference"}
            fontSize="3xl"
            textAlign={"center"}
            textColor={"whiteAlpha.900"}
          >
            CHOOSE A CHAT TO GET START
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
            backdropBlur="200px"
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
                {/**user badge */}
                <Box
                  display={"flex"}
                  alignItems="center"
                  position="absolute"
                  top={5}
                  zIndex={2}
                  left={10}
                  bgGradient={bgColor}
                  minW="300"
                  w="fit-content"
                  p={2}
                  opacity="0.95"
                  transition={"all 0.2s ease-in-out"}
                  _hover={{ opacity: 1 }}
                  borderRadius="full"
                  textColor={
                    colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"
                  }
                >
                  <IconButton
                    mx={1}
                    my={2}
                    bg="none"
                    w="50px"
                    h="30px"
                    borderRadius="full"
                    display={{ base: "flex", md: "none" }}
                    icon={<ChevronLeftIcon fontSize={"lg"} />}
                    size="20px"
                    textColor={
                      colorMode === "light"
                        ? "blackAlpha.900"
                        : "whiteAlpha.900"
                    }
                    onClick={() => setSelectedChat("")}
                  />
                  {selectedChat.isGroupChat ? (
                    <AvatarGroup size={"sm"} max={2} marginRight={3}>
                      {selectedChat.users.map((u) => (
                        <Avatar
                          key={u._id}
                          size={"xs"}
                          name={u.fullname}
                          src={u.pic}
                        />
                      ))}
                    </AvatarGroup>
                  ) : (
                    <>
                      <Avatar
                        showBorder={true}
                        size={"md"}
                        marginRight={3}
                        name={user?._id && getSender(user, selectedChat.users)}
                        src={getSenderInfo(user, selectedChat.users).pic}
                      ></Avatar>
                    </>
                  )}

                  <Box w="full" pr="5">
                    {selectedChat.isGroupChat ? (
                      <div>
                        <UpdateGroupChatModal
                          fetchAgain={fetchAgain}
                          setFetchAgain={setFetchAgain}
                          fetchMessages={fetchMessages}
                        >
                          <Text
                            textColor={
                              colorMode === "light" ? "black" : "whiteAlpha.900"
                            }
                            fontWeight={"bold"}
                            _hover={{ textDecor: "underline" }}
                          >
                            {selectedChat.chatName}{" "}
                          </Text>
                        </UpdateGroupChatModal>
                        <Text
                          textColor={
                            colorMode === "light" ? "black" : "whiteAlpha.900"
                          }
                          fontWeight={"normal"}
                        >
                          {selectedChat.users.length} members
                        </Text>
                      </div>
                    ) : (
                      <>
                        <ProfileModal
                          user={getSenderInfo(user, selectedChat.users)}
                        >
                          <Text
                            textColor={
                              colorMode === "light" ? "black" : "whiteAlpha.900"
                            }
                            fontWeight={"bold"}
                            _hover={{ textDecor: "underline" }}
                          >
                            {getSender(user, selectedChat.users)}
                          </Text>
                        </ProfileModal>
                        <Text
                          textColor={
                            colorMode === "light" ? "black" : "whiteAlpha.900"
                          }
                          fontWeight={"normal"}
                          opacity={0.8}
                        >
                          {getSenderInfo(user, selectedChat.users).statusOnline
                            ? "online"
                            : "Last online " +
                            moment(
                              getSenderInfo(user, selectedChat.users)
                                .updatedAt
                            ).calendar()}
                        </Text>
                      </>
                    )}
                  </Box>
                </Box>
                {/** button group*/}
                <Box
                  position="absolute"
                  top={7}
                  right={10}
                  zIndex={2}
                  display="flex"
                  alignItems={"center"}
                >
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
                        <PhoneIcon textColor={"whiteAlpha.900"} />
                      ) : (
                        <PhoneIcon textColor={"yellow"} />
                      )
                    }
                  />
                  <div
                    className={`${isOn ? "justify-end" : "justify-start"
                      } w-[50px] h-[30px] bg-slate-400 flex rounded-full p-1 cursor-pointer 
                    `}
                    onClick={toggleSwitch}
                  >
                    <motion.div
                      className="handle w-[20px] flex justify-center items-center h-[20px]  rounded-full"
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 20,
                      }}
                    >
                      <IconButton
                        variant={"ghost"}
                        className="transition-opacity"
                        borderRadius="full"
                        onClick={toggleColorMode}
                        transform="unset"
                        _hover={{
                          transform: "rotate(40deg)",

                          color: "black",
                          bgGradient:
                            colorMode === "light"
                              ? "linear(to-b,#C39A9E,#808293)"
                              : "linear(to-b,#1E2B6F,#193F5F)",
                        }}
                        icon={
                          colorMode === "light" ? (
                            <MoonIcon textColor={"whiteAlpha.900"} />
                          ) : (
                            <SunIcon textColor={"yellow"} />
                          )
                        }
                      />
                    </motion.div>
                  </div>
                </Box>
                <MessagesProvider>
                  <MessageList messages={messages} setMessages={setMessages} />
                  <FormControl
                    onKeyDown={sendMessage}
                    isRequired
                    bottom={0}
                    left={0}
                    p={5}
                    pos="absolute"
                  >
                    {isTyping && (
                      <Fade in={onToggle}>
                        <Box
                          w="fit-content"
                          border={"1px solid black"}
                          display="flex"
                          pos="relative"
                          bottom={-5}
                          bgColor={"blackAlpha.800"}
                          borderRadius={"full"}
                          p={1}
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
                              marginBottom: 0,
                              marginLeft: 0,
                            }}
                          />
                          <Text
                            mixBlendMode={"difference"}
                            textColor="whiteAlpha.900"
                            fontSize={12}
                          >
                            {selectedChat.isGroupChat
                              ? getSender(user, selectedChat.users)
                              : selectedChat.users[0]._id !== user._id
                                ? selectedChat.users[1].fullname
                                : selectedChat.users[0].fullname}{" "}
                            is typing
                          </Text>
                        </Box>
                      </Fade>
                    )}
                    <Box
                      display={`${toggle ? "" : "none"}`}
                      pos="absolute"
                      bottom={"28"}
                      right={5}
                    >
                      <EmojiPicker
                        onEmojiClick={(emojiData, e) => {
                          setNewMessage(newMessage + emojiData.emoji);
                        }}
                        autoFocusSearch={false}
                        theme={colorMode ? Theme.DARK : Theme.LIGHT}
                      />
                    </Box>

                    <InputGroup size="lg" marginY={4}>
                      <ResponseMessage
                        setResponseMessageID={setResponseMessageID}
                      />
                      <Input
                        variant="outline"
                        rounded={"full"}
                        bg="whiteAlpha.900"
                        textColor={"black"}
                        placeholder="Type something..."
                        value={newMessage}
                        onChange={typingHandler}
                        _focus={{
                          opacity: 0.8,
                        }}
                      />
                      <InputRightElement
                        width="15.5rem"
                        justifyContent={"space-around"}
                      >

                        <Input size="sm" ref={inputRef} multiple={true} onChange={selectChange} accept="image/*" type="file"></Input>
                        <Input size="sm" ref={inputRef} multiple={true} onChange={handleFileChange}
                          accept="video/*"
                          type="file"></Input>
                        <Input size="sm" ref={inputRef} multiple={true} onChange={selectChangeFile}
                          accept="file_extension"
                          type="file"></Input>

                        <Text
                          className={`shadow-md
                      ${colorMode === "light"
                              ? "text-darkblue bg-gradient-to-bl from-whiteAlpha.900 to-[#B1AEC6]"
                              : "text-whiteAlpha.900 bg-gradient-to-tr from-[#1E2B6F] to-[#193F5F]"
                            }
                      rounded-full text-3xl w-8 h-8  hover:bg-opacity-50`}
                          onClick={() => setToggle(!toggle)}
                        >
                          <i className="fa fa-smile" aria-hidden="true"></i>
                        </Text>

                        <Text
                          className={`shadow-md
                      ${colorMode === "light"
                              ? "text-darkblue bg-gradient-to-bl from-whiteAlpha.900 to-[#B1AEC6]"
                              : "text-whiteAlpha.900 bg-gradient-to-tr from-[#1E2B6F] to-[#193F5F]"
                            }
                      rounded-full text-3xl w-8 h-8  hover:bg-opacity-50`}
                          onClick={() => sendMessage("Send")}
                        >
                          <i
                            className="fa fa-paper-plane"
                            aria-hidden="true"
                          ></i>
                        </Text>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </MessagesProvider>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
export default ChatZone;
