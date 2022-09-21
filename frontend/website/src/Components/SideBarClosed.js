import {
  ArrowForwardIcon,
  ChevronDownIcon,
  HamburgerIcon,
  InfoIcon,
  Search2Icon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../providers/ChatProvider";
import ProfileModal from "./ProfileModal";

function SideBarClosed() {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigator = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigator("/");
  };
  const btnRef = React.useRef();

  return (
    <Box
      bgGradient={bg}
      h="full"
      position={"relative"}
      w="fit-content"
      overflow={"auto"}
      py={5}
      px={2}
    >
      <Box
        display="flex"
        flexDir={"column"}
        alignItems={"center"}
        position={"relative"}
        top="0"
        zIndex={10}
      >
        <IconButton
          placement="left"
          icon={<HamburgerIcon />}
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
        >
          Open
        </IconButton>
        <Drawer
          isOpen={isOpen}
          placement={"left"}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader textAlign={"center"}>Menu</DrawerHeader>

            <DrawerBody>
              <VStack spacing={0} align="stretch">
                <ProfileModal user={user}>
                  <Button w={"full"} leftIcon={<InfoIcon />} variant="ghost">
                    <Text>Infomation</Text>
                  </Button>{" "}
                </ProfileModal>
                <Button
                  w={"full"}
                  leftIcon={<ArrowForwardIcon />}
                  variant="ghost"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
                <Text w={"full"} leftIcon={<Search2Icon />} variant="ghost">
                  Search chat
                </Text>
                <Input placeholder="Type here..." />
              </VStack>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>

        <IconButton
          variant="outline"
          size={"lg"}
          icon={<ViewOffIcon size="xl" color={"whiteAlpha.900"} />}
          borderColor="transparent"
          borderRadius={"full"}
          aria-label="View Off"
          onClick={() => setCloseSideBar(false)}
          _hover={{
            bgColor: "transparent",
          }}
          _active={{
            bgColor: "transparent",
          }}
        />
        <Box display="flex" w="fit-content" borderRadius="full">
          <Box position="relative">
            <Tooltip hasArrow label={"@" + user?.username}>
              <Avatar
                id="bgChatZone"
                name={user?.fullname}
                src={user?.pic}
                size="md"
                outline={"white 2px solid "}
              >
                <AvatarBadge
                  boxSize={5}
                  bg="green.500"
                  borderColor={colorMode === "light" ? "darkblue" : "white"}
                ></AvatarBadge>
              </Avatar>
            </Tooltip>
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
        </Box>
      </Box>
    </Box>
  );
}

export default SideBarClosed;
