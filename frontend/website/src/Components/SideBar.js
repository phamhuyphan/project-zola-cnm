import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  InfoIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import React from "react";
import ChatList from "./ChatsList";
import { ChatState } from "../providers/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
function SideBar({ fetchAgain, setfetchAgain }) {
  const bg = useColorModeValue(
    "linear(to-t,blue.900,purple.900)",
    "linear(to-b,#C39A9E,#808293)"
  );
  const colorLoggedUser = useColorModeValue(
    "linear(to-b,#1E2B6F,#193F5F)",
    "linear(to-b,white,#B1AEC6)"
  );
  const { setCloseSideBar, user } = ChatState();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigator = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigator("/");
  };
  return (
    <Box
      className="scrollbar-thin  scrollbar-track-transparent scrollbar-thumb-slate-500"
      bgGradient={bg}
      h="full"
      position={"relative"}
      minW={"fit-content"}
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
          w="250px"
          m={5}
          p={2}
          borderRadius="full"
          bgGradient={colorLoggedUser}
          boxShadow="xl"
          justifyContent={"space-between"}
        >
          <Box display="flex">
            <Box position="relative" mr={3}>
              <Avatar id="bgChatZone" name={user?.fullname} src={user?.pic}>
                <AvatarBadge
                  boxSize={5}
                  bg="green.500"
                  borderColor={colorMode === "light" ? "darkblue" : "white"}
                ></AvatarBadge>
              </Avatar>
              <Text
                bgColor={"red"}
                position="absolute"
                borderRadius={"full"}
                textAlign="center"
                verticalAlign={"middle"}
                textColor={"white"}
                fontSize={"small"}
                top={0}
                left={0}
                w={5}
                h={5}
              >
                12
              </Text>
            </Box>
            <Box textColor={useColorModeValue("white", "black")}>
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
                  textColor={colorMode === "light" ? "white" : "black"}
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
        </Box>

        <IconButton
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
      </Box>
      <ChatList fetchAgain={fetchAgain} setFetchAgain={setfetchAgain} />
    </Box>
  );
}

export default SideBar;
