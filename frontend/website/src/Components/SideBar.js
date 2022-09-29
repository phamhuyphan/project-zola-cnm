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
  HamburgerIcon,
  InfoIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ChatList from "./ChatsList";
import { ChatState } from "../providers/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import UserListItem from "./UserListItem";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./GroupChatModal";
function SideBar({ fetchAgain, setFetchAgain }) {
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
  const [isHover, setHover] = useState(false);
  const toast = useToast();
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

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
    <>
      <Box
        className="scrollbar-thin  scrollbar-track-blue-900 scrollbar-thumb-slate-500"
        // bgGradient={bg}
        h="100vh"
        position={"relative"}
        minW={"fit-content"}
        w="full"
        zIndex={1}
        overflowX="hidden"
      >
        {/**Sidebar navigation */}
        <Box
          position={"sticky"}
          top={0}
          zIndex={10}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Box
            display="flex"
            alignItems={"center"}
            position={"sticky"}
            p={{ base: 0, md: 3 }}
            justifyContent={"center"}
            top={0}
            zIndex={10}
          >
            {/**Avata user badge */}
            <Box
              display="flex"
              w={{ base: "full", md: "fit-content" }}
              mt={{ base: "0", md: "5" }}
              p={2}
              borderRadius={{ base: " 0 0 20px 20px ", md: "full" }}
              bgGradient={{ base: "unset", md: colorLoggedUser }}
              boxShadow="xl"
              justifyContent="space-between"
              alignItems="center"
              _hover={{
                py: { base: 20, md: 2 },
                transitionProperty: "all",
                transitionTimingFunction: " cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "150ms",
                bgPosition: "top 40% right 0",
                outline: { base: "1px solid white", md: "unset" },
                borderTop: 0,
                filter: "unset",
              }}
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
                          bg={"green.500"}
                          borderColor={
                            colorMode === "light" ? "white" : "darkblue"
                          }
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
                          console.log(notify.chat);
                          setNotification(notify.filter((n) => n !== notify));
                        }}
                      >
                        {notify.chat.isGroupChat
                          ? `New Message(s) in ${notify.chat.chatName}`
                          : `New Message(s) from @${notify.sender.username}`}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
                <Box textColor={useColorModeValue("blackAlpha.900", "white")}>
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
              <Box
                pos={"relative"}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
                px="3"
              >
                {/**Add group chat */}

                <GroupChatModal>
                  <Button
                    display="flex"
                    fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                    rightIcon={<AddIcon fontSize={"25px"} />}
                  >
                    New Group Chat
                  </Button>
                </GroupChatModal>

                {/**button serch */}
                <Tooltip
                  label="Search users to chat with"
                  hasArrow
                  placement="bottom-end"
                >
                  <Button
                    borderRadius={"full"}
                    bgColor="transparent"
                    onClick={onOpen}
                    mx={1}
                    w={{ base: "17px", md: "10px", lg: "17px" }}
                  >
                    <SearchIcon fontSize={"25px"} />
                  </Button>
                </Tooltip>

                {/**button menu */}
                <Menu>
                  <MenuButton
                    borderRadius={"full"}
                    w={{ base: "17px", md: "10px", lg: "17px" }}
                    mx={1}
                    mt={1}
                    as={IconButton}
                    position="relative"
                    border="none"
                    aria-label="Options"
                    icon={
                      <HamburgerIcon
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
                    <MenuItem
                      icon={<ArrowForwardIcon />}
                      onClick={logoutHandler}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
                {/** Change theme (md) */}
                <Box
                  position={"absolute"}
                  top={1}
                  left={-14}
                  display={{ base: "inline-block", md: "none" }}
                >
                  <div
                    className={`${
                      isOn ? "justify-end" : "justify-start"
                    } w-[50px] h-[30px] bg-slate-400 flex rounded-full p-1 cursor-pointer `}
                    onClick={toggleSwitch}
                  >
                    <motion.div
                      className="handle w-[20px] flex justify-center items-center h-[20px]  rounded-full"
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30,
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
                            <MoonIcon textColor={"white"} />
                          ) : (
                            <SunIcon textColor={"yellow"} />
                          )
                        }
                      />
                    </motion.div>
                  </div>
                </Box>
              </Box>
            </Box>
            {/**view button */}
            <IconButton
              display={{
                base: "none",
                md: "block",
              }}
              mt={5}
              mx={2}
              variant="outline"
              size={"lg"}
              onClick={() => setCloseSideBar(true)}
              icon={<ViewIcon size="xl" color={"whiteAlpha.900"} />}
              borderColor="transparent"
              bgBlendMode={"overlay"}
              borderRadius={"full"}
              aria-label="View"
            />
          </Box>
          {/** Background img*/}
          <Box
            pos={"absolute"}
            top={0}
            zIndex={5}
            h={isHover ? "75px" : "70px"}
            w={{ base: "full", md: "fit-content" }}
            p={{ base: !isHover ? "10px" : "107px", md: "0" }}
            borderRadius={{ base: " 0 0 20px 20px ", md: "full" }}
            boxShadow="xl"
            bgImage={{ base: `url('${user?.pic}')`, md: "none" }}
            bgRepeat={"no-repeat"}
            bgSize="cover"
            bgPosition={isHover ? "top 40% right 0" : "center"}
            className="transition-all"
            filter={!isHover && "grayscale(100%)"}
          ></Box>
          {/** Background gradient*/}
          <Box
            pos={"absolute"}
            top={0}
            zIndex={6}
            h={isHover ? "75px" : "70px"}
            w={{ base: "full", md: "fit-content" }}
            p={{ base: !isHover ? "10px" : "107px", md: "0" }}
            borderRadius={{ base: " 0 0 20px 20px ", md: "full" }}
            boxShadow="xl"
            bgRepeat={"no-repeat"}
            bgSize="cover"
            bgPosition={isHover ? "top 40% right 0" : "center"}
            className={`transition-all bg-gradient-to-b ${
              colorMode === "dark" ? "from-[#00000d7d]" : "from-[#ffffff7d]"
            }`}
            filter={!isHover && "grayscale(100%)"}
          ></Box>
        </Box>
        <ChatList fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
            <DrawerBody>
              <Box display="flex" pb={2}>
                <Input
                  placeholder="Search user by name or email to chat with"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : searchResult.length > 0 ? (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              ) : (
                <Text className="font-bold">¯\_(ツ)_/¯</Text>
              )}
              {loadingChat && <Spinner ml="auto" display="flex" />}
            </DrawerBody>
          </DrawerContent>
          <DrawerFooter></DrawerFooter>
        </Drawer>
      </Box>
      <Box
        className="scrollbar-thin  scrollbar-track-blue-900 scrollbar-thumb-slate-500"
        bgGradient={bg}
        h="100vh"
        position={"absolute"}
        minW={"fit-content"}
        zIndex={0}
        w="full"
        overflowX="hidden"
      ></Box>
      <Box
        className="scrollbar-thin  scrollbar-track-blue-900 scrollbar-thumb-slate-500"
        bgImage={`url('${user?.pic}')`}
        display={{ md: "inline-block", base: "none" }}
        h="100vh"
        position={"absolute"}
        minW={"fit-content"}
        zIndex={0}
        opacity={0.3}
        w="full"
        overflowX="hidden"
        bgRepeat={"no-repeat"}
        bgSize="cover"
        bgPos={"top 45% right 45%"}
      ></Box>
    </>
  );
}

export default SideBar;
