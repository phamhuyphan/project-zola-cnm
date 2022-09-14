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
function SideBar() {
  const bg = useColorModeValue(
    "linear(to-t,blue.900,purple.900)",
    "linear(to-b,#C39A9E,#808293)"
  );
  const colorLoggedUser = useColorModeValue(
    "linear(to-b,#1E2B6F,#193F5F)",
    "linear(to-b,white,#B1AEC6)"
  );
  const { closeSideBar, setCloseSideBar } = ChatState();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      className="scrollbar-thin scrollbar-thumb-blue-900  scrollbar-track-transparent "
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
        >
          <Box position="relative" mr={3}>
            <Avatar
              id="bgChatZone"
              name="Louis Vincent"
              src={
                "https://images.pexels.com/photos/1715092/pexels-photo-1715092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
            >
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
              top={-1}
              right={-3}
              w={7}
              h={7}
              border={"4px solid transparent"}
            >
              12
            </Text>
          </Box>
          <Box textColor={useColorModeValue("white", "black")}>
            <Text opacity={0.7} fontSize="xs">
              @iamlouis
            </Text>
            <Text fontSize={"lg"} lineHeight={1}>
              Louis Vincent
            </Text>
          </Box>
          <Menu>
            <MenuButton
              mx={3}
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
              <MenuItem icon={<InfoIcon />}>Infomation</MenuItem>
              <Divider />
              <MenuItem icon={<ArrowForwardIcon />}>Log out</MenuItem>
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
      <ChatList />
    </Box>
  );
}

export default SideBar;
