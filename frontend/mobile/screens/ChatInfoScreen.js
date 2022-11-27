import { View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Modal,
  Pressable,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "native-base";
import { getSender, getSenderInfo } from "../logic/ChatLogic";
import moment from "moment";
import { ChatState } from "../providers/ChatProvider";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const link = "https://zolachatapp.herokuapp.com";
const ChatInfoScreen = () => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const nav = useNavigation();
  useEffect(() => {
    setNewName(selectedChat.chatName);
  }, [selectedChat]);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [renameLoading, setRenameLoading] = useState(false);

  return (
    <VStack flex="1" space={2} w="full">
      <Box
        bg={{
          linearGradient: {
            end: { x: 0.5, y: 1 },
            colors:
              colorMode === "light"
                ? ["rgba(238,174,202,0.75)", "rgba(148,187,233,0.75)"]
                : ["#1E2B6F", "#193F5F"],
          },
        }}
        display={"flex"}
        justifyContent={"center"}
        alignItems="center"
        w="full"
        py="5"
      >
        <HStack>
          <Text
            fontSize={"3xl"}
            color={colorMode === "light" ? "black" : "white"}
          >
            {selectedChat.chatName}
          </Text>
          <IconButton
            rounded={"full"}
            variant={"ghost"}
            onPress={() => setShowModal(true)}
            icon={
              <Feather
                name="edit"
                size={18}
                color={colorMode === "light" ? "black" : "white"}
              />
            }
          ></IconButton>
        </HStack>
        <Avatar.Group
          _avatar={{
            size: "sm",
          }}
          max={2}
          py={0.5}
          pl={1}
          marginRight={3}
          showBorder={true}
        >
          {selectedChat.users.map((u) => (
            <Avatar
              key={u._id}
              name={u.fullname}
              source={{ uri: u.pic ? u.pic : "no-links" }}
            />
          ))}
        </Avatar.Group>
      </Box>
      <Pressable
        onPress={() => nav.navigate("MembersScreen")}
        width={"full"}
        bg={colorMode === "light" ? "white" : "gray.300"}
        px="10"
        py="5"
        flexDirection="row"
        alignItems={"center"}
      >
        <Ionicons name="people-outline" size={24} color="black" />
        <Text mx="2" fontSize="20">
          Check Group Member's ({selectedChat.users.length})
        </Text>
      </Pressable>
      <Pressable
        width={"full"}
        bg={colorMode === "light" ? "white" : "gray.300"}
        px="10"
        py="5"
        flexDirection="row"
        alignItems={"center"}
      >
        <SimpleLineIcons name="logout" size={24} color="red" />
        <Text mx="2" fontSize="20" color={"red.500"}>
          Leave Group
        </Text>
      </Pressable>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Change Group Name</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input value={selectedChat.chatName} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

export default ChatInfoScreen;
