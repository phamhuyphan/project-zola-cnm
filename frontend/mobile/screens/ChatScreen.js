import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ChatState } from "../providers/ChatProvider";
import axios from "axios";
import ChatsList from "../components/ChatsList";
import {
  Box,
  Icon,
  IconButton,
  Input,
  SearchIcon,
  StatusBar,
} from "native-base";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const link = "https://zolachatapp.herokuapp.com";
import { io } from "socket.io-client";

let socket;
const ChatScreen = ({ fetchAgain }) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  }, []);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);
  const fetchChats = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
        cancelToken: source.token,
      };
      const { data } = await axios.get(`${link}/api/chat`, config);
      if (user) setChats(data);
    } catch (error) {
      if (axios.isCancel(error)) console.log("successfully aborted");
      else {
        console.log(error);
      }
    }
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  };
  useEffect(() => {
    socket = io(link);
    if (user) {
      socket.emit("setup", user);
      socket.on("connected", (e) => {
        console.log("first:" + e);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box className="flex-1" safeAreaTop>
      <Box
        style={{
          width: "100%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        shadow="9"
      >
        <ImageBackground
          imageStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          source={{ uri: user.pic }}
          resizeMode="cover"
        >
          <LinearGradient
            end={{ x: 0.5, y: 1 }}
            colors={["#1E2B6F", "#193F5F"]}
            style={{
              opacity: 0.75,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Box className="p-5 w-full border-[#1E2B6F] border-[3px] border-t-0 rounded-b-[20]">
              <Text className="text-md text-white">@{user.username}</Text>
              <Text className="text-xl text-white font-bold">
                {user.fullname}
              </Text>
              <Box
                display={"flex"}
                flexDir="row"
                justifyContent={"center"}
                alignItems="center"
                mt="5"
                mx="2"
              >
                <Input
                  w={"full"}
                  bgColor="white"
                  fontSize={18}
                  variant="filled"
                  rounded={"full"}
                  InputLeftElement={<SearchIcon size={5} ml="2" />}
                  placeholder="Search a chat"
                  ml="1"
                  mr="0.25"
                />
                <IconButton
                  variant={"ghost"}
                  icon={
                    <FontAwesome name="user-plus" size={24} color="white" />
                  }
                  borderRadius="full"
                ></IconButton>
              </Box>
            </Box>
          </LinearGradient>
        </ImageBackground>
      </Box>
      <ChatsList />
    </Box>
  );
};

export default ChatScreen;
