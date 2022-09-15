import { MoonIcon, PhoneIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../providers/ChatProvider";
import MessageZone from "./MessageZone";

function ChatZone() {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue(
    "linear(to-b,#1E2B6F,#193F5F)",
    "linear(to-b,white,#B1AEC6)"
  );
  return (
    <Box
      w={"full"}
      h="full"
      bgImage={`url(${user?.pic})`}
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
            {selectedChat && (
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
                  colorMode === "light" ? "whiteAlpha.900" : "blackAlpha.900"
                }
              >
                <Avatar name={selectedChat.chatName} src="" mr={3}>
                  <AvatarBadge
                    boxSize={5}
                    bg="green.500"
                    borderColor={colorMode === "light" ? "darkblue" : "white"}
                  ></AvatarBadge>
                </Avatar>
                <Text fontWeight={"bold"}>
                  {selectedChat.chatName}
                  {selectedChat.isGroupChat === true && (
                    <Text fontWeight={"normal"}>
                      {selectedChat.users.length} members
                    </Text>
                  )}
                </Text>
              </Box>
            )}
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
            <MessageZone />
          </Box>
        </>
      )}
    </Box>
  );
}

export default ChatZone;
