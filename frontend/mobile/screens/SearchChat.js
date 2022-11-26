import { View, Text, ImageBackground, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";

import { Box, IconButton, Input, SearchIcon, StatusBar } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ChatState } from "../providers/ChatProvider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const link = "http://192.168.1.10:5000";
import axios from "axios";
import UserListItem from "./UserListItem";

const SearchChat = ({ navigation }) => {
  const nav = useNavigation();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${link}/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      navigation.navigate("ChatScreen");
    } catch (error) {
      // toast({
      //   title: "Failed to fetching chat",
      //   description: error.message,
      //   status: "error",
      //   duration: 2500,
      //   isClosable: true,
      //   position: "top-left",
      // });
      console.log("3333");
    }
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${link}/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      // toast({
      //   title: "Error Occured",
      //   description: "Failed to load search results",
      //   status: "error",
      //   duration: 2500,
      //   isClosable: true,
      //   position: "top-left",
      // });
      console.log("22222");
    }
  };
  return (
    <Box className="flex-1">
      <Box className="">
        <StatusBar />
        <Box className="w-[100%]" shadow="9">
          <ImageBackground
            source={{ uri: user.pic }}
            resizeMode="cover"
            imageStyle={{
              filler: "grayScale(100%)",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
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
                <Box>
                  <Text className="text-md text-white">@{user.username}</Text>
                  <Text className="text-xl text-white font-bold">
                    {user.fullname}
                  </Text>
                </Box>

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
                    onChangeText={(e) => handleSearch(e)}
                  />
                  <IconButton
                    variant={"ghost"}
                    icon={
                      <MaterialIcons name="group-add" size={28} color="white" />
                    }
                    borderRadius="full"
                    onPress={() => {
                      navigation.navigate("AddGroup");
                    }}
                  ></IconButton>
                </Box>
              </Box>
            </LinearGradient>
          </ImageBackground>
        </Box>
        <LinearGradient
          end={{ x: 1, y: 0.75 }}
          colors={["#0660AB", "#B000CD"]}
          style={{ borderRadius: 9999 }}
        ></LinearGradient>
      </Box>
      <Box className="items-center">
        {loading ? (
          <Text>loading</Text>
        ) : (
          // searchResult
          //   ?.slice(0, 3)
          //   .map((user) => (
          //     <UserListItem
          //       key={user._id}
          //       user={user}
          //       handleFunction={() => handleGroup(user)}
          //     />
          //   ))
          <FlatList
            data={searchResult}
            renderItem={({ item }) => (
              <UserListItem
                key={item._id}
                user={item}
                handleFunction={() => accessChat(item._id)}
              />
            )}
          ></FlatList>
        )}
      </Box>
    </Box>
  );
};

export default SearchChat;
