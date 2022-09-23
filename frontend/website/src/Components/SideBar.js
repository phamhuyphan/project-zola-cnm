import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  InfoIcon,
  MoonIcon,
  SunIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import React, { useState } from "react";
import ChatList from "./ChatsList";
import { ChatState } from "../providers/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import UserListItem from "./UserListItem";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../logic/ChatLogic";
function SideBar({ fetchAgain, setfetchAgain }) {
  const bg = useColorModeValue(
    "linear(to-b,#C39A9E,#808293)",
    "linear(to-t,blue.900,purple.900)"
  );
  const colorLoggedUser = useColorModeValue(
    "linear(to-b,white,#B1AEC6)",
    "linear(to-b,#1E2B6F,#193F5F)"
  );
  const {
    setCloseSideBar,
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigator = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigator("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Enter something to search",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load search results",
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Failed to fetching chat",
        description: error.message,
        status: "error",
        duration: 2500,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  return (
    <Box
      className="scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-slate-500"
      bgGradient={bg}
      h="full"
      position={"relative"}
      minW={"fit-content"}
      w="100%"
      overflowY={"scroll"}
    >
      <Box
        display="flex"
        alignItems={"center"}
        position={"sticky"}
        top="0"
        zIndex={10}
      >
        <Box
          display="flex"
          w="fit-content"
          mx={"auto"}
          mt="5"
          p={2}
          borderRadius="full"
          bgGradient={colorLoggedUser}
          boxShadow="xl"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box display="flex">
            <Menu>
              <MenuButton
                position="relative"
                borderRadius="full"
                border="3px solid black"
                _hover={{
                  borderColor: "yellow.500",
                }}
                mr={3}
              >
                <Box borderRadius="full" id="bgChatZone">
                  <Avatar size={"md"} name={user?.fullname} src={user?.pic}>
                    <AvatarBadge
                      boxSize={5}
                      bg="green.500"
                      borderColor={colorMode === "light" ? "white" : "darkblue"}
                    ></AvatarBadge>
                  </Avatar>
                  {notification.length > 0 && (
                    <Text
                      position="absolute"
                      bg="red"
                      borderRadius="full"
                      w="22px"
                      fontSize="14px"
                      h="22px"
                      verticalAlign="middle"
                      color="white"
                      top="0px"
                      right="0px"
                    >
                      {notification.length}
                    </Text>
                  )}
                </Box>
              </MenuButton>
              <MenuList pl={2}>
                {!notification.length && "No new messages"}
                {notification.map((notify) => (
                  <MenuItem
                    key={notify._id}
                    onClick={() => {
                      setSelectedChat(notify.chat);
                      setNotification(notify.filter((n) => n !== notify));
                    }}
                  >
                    {notify.chat.isGroupChat
                      ? `New Message(s) in ${notify.chat.chatName}`
                      : `New Message(s) from ${getSender(
                          user,
                          notify.chat.users
                        )}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Box textColor={useColorModeValue("black", "white")}>
              <Text opacity={0.7} fontSize="xs">
                @{user?.username}
              </Text>
              <Text
                fontSize={"lg"}
                lineHeight={1}
                textOverflow="ellipsis"
                w="125px"
                noOfLines={1}
              >
                {user?.fullname}
              </Text>
            </Box>
          </Box>
          <Menu>
            <MenuButton
              mx={2}
              mt={1}
              as={IconButton}
              border="none"
              aria-label="Options"
              _hover={{
                bgColor: "transparent",
              }}
              _active={{
                bgColor: "transparent",
              }}
              icon={
                <ChevronDownIcon
                  fontSize={25}
                  textColor={colorMode === "light" ? "black" : "white"}
                />
              }
              variant="outline"
            />
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem icon={<InfoIcon />}>
                  <Text>Infomation</Text>
                </MenuItem>
              </ProfileModal>
              <Divider />
              <MenuItem icon={<ArrowForwardIcon />} onClick={logoutHandler}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
          <Tooltip
            label="Search users to chat with"
            hasArrow
            placement="bottom-end"
          >
            <Button
              bgColor="transparent"
              _hover={{
                bgColor: "transparent",
              }}
              _active={{
                bgColor: "transparent",
              }}
              onClick={onOpen}
              color="white"
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </Tooltip>
        </Box>
        <IconButton
          display={{
            base: "none",
            md: "block",
          }}
          variant="outline"
          size={"lg"}
          onClick={() => setCloseSideBar(true)}
          icon={<ViewIcon size="xl" color={"whiteAlpha.900"} />}
          borderColor="transparent"
          bgBlendMode={"overlay"}
          borderRadius={"full"}
          aria-label="View"
          _hover={{
            bgGradient: "linear(to-br,red.500, yellow.500)",
          }}
        />
        <Box
          position="absolute"
          top={7}
          right={10}
          display={{ base: "block", md: "none" }}
        >
          <IconButton
            variant={"ghost"}
            bgGradient={
              colorMode === "light"
                ? "linear(to-b,#C39A9E,#808293)"
                : "linear(to-b,#1E2B6F,#193F5F)"
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
      </Box>
      <ChatList fetchAgain={fetchAgain} setFetchAgain={setfetchAgain} />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search user by name or email to chat"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
        <DrawerFooter></DrawerFooter>
      </Drawer>
    </Box>
  );
}

export default SideBar;
