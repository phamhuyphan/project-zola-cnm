import { View } from "react-native";
import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Divider,
  IconButton,
  CheckIcon,
  CloseIcon,
  ScrollView,
} from "native-base";
import { ChatState } from "../providers/ChatProvider";

const MembersScreen = () => {
  const { selectedChat, user } = ChatState();
  return (
    <Box flex="1" w="full">
      <ScrollView>
        <VStack>
          <HStack px="2" py="4" w="full" alignItems={"center"}>
            <Avatar
              mx="2"
              source={{ uri: selectedChat.chatAdmin.pic }}
              size={"md"}
            />
            <Text fontSize="20" color="black">
              {selectedChat.chatAdmin.fullname}
            </Text>
          </HStack>
          {selectedChat.users.map((u, index) => (
            <HStack px="2" py="4" w="full" key={index} alignItems={"center"}>
              <Avatar mx="2" source={{ uri: u?.pic }} size={"md"} />
              <VStack flex="1">
                <Text fontSize="12" color="black">
                  @{u.username}
                </Text>
                <Text fontSize="20" color="black" flex="1">
                  {u.fullname}
                </Text>
              </VStack>
              {user._id === selectedChat.chatAdmin._id && (
                <>
                  <IconButton
                    // onClick={onOpen}
                    variant={"ghost"}
                    icon={<CheckIcon size={5} />}
                  ></IconButton>
                  <IconButton
                    // onClick={handleFunction}
                    variant={"ghost"}
                    icon={<CloseIcon size={5} color="black" />}
                  ></IconButton>
                </>
              )}
            </HStack>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default MembersScreen;
