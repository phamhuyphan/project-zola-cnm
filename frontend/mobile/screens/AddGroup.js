import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar, Box, Input } from "native-base";
import axios from "axios";
import UserListItem from "./UserListItem";
const link = "http://192.168.1.10:5000";
import "localstorage-polyfill";
import { ChatState } from "../providers/ChatProvider";

const AddGroup = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [groupChatName, setGroupChatName] = useState("");

  const { user, chats, setChats } = ChatState();

  const handleRemove = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userToRemove._id));
  };

  const handlerSearch = async (query) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        cancelToken: source.token,
      };

      const { data } = await axios.get(
        `${link}/api/user?search=${search}`,
        config
      );
      console.log(data);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) console.log("successfully aborted");
      //   toast({
      //     title: "Error Occured",
      //     description: "Failed to load search results",
      //     status: "error",
      //     duration: 2500,
      //     isClosable: true,
      //     position: "bottom-left",
      //   });
      else console.log("1");
    }
    return () => {
      source.cancel();
    };
  };
  const handleGroup = (userToAdd) => {
    console.log("1111111");
    if (selectedUsers.includes(userToAdd)) {
      // toast({
      //   title: "User already added",
      //   status: "error",
      //   duration: 2500,
      //   isClosable: true,
      //   position: "top",
      // });
      console.log("2");
      return;
    }
    console.log("33333333");
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handlerSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      // toast({
      //   title: "Please flill all the fields",
      //   status: "error",
      //   duration: 2500,
      //   isClosable: true,
      //   position: "top",
      // });
      console.log("10");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${link}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      //onClose();
      // toast({
      //   title: `${groupChatName} was successfully created!`,
      //   status: "success",
      //   duration: 2500,
      //   isClosable: true,
      //   position: "bottom",
      // });
      console.log("11");
      setLoading(false);
    } catch (error) {
      // toast({
      //   title: "Failed to create the chat",
      //   status: "error",
      //   duration: 2500,
      //   isClosable: true,
      //   position: "bottom",
      // });
      console.log("12");
    }
  };
  return (
    <Box className=" flex-1 items-center p-4 m-4">
      <Text className="text-3xl font-bold">Create group chat</Text>
      <Input
        w={"full"}
        bgColor="white"
        fontSize={18}
        variant="filled"
        rounded={"lg"}
        placeholder="Chat Name"
        ml="1"
        mr="0.25"
        onChangeText={(e) => setGroupChatName(e)}
      />
      <Input
        w={"full"}
        bgColor="white"
        fontSize={18}
        variant="filled"
        rounded={"lg"}
        placeholder="Add more than 3 user to the group "
        ml="1"
        mr="0.25"
        mt="2"
        onChangeText={(e) => handlerSearch(e)}
      />
      <Box
        className="mt-2 "
        style={{ display: "flex", flexWrap: "wrap" }}
        w="100%"
        h="50px"
      >
        {selectedUsers.map((u) => (
          <TouchableOpacity
            className="flex-row items-center justify-center"
            onPress={() => handleRemove(u)}
          >
            <Box
              border={"1px solid white"}
              borderRadius="md"
              _hover={{ bg: "red" }}
              className="transition-colors flex-row "
              py="1"
              px="2"
              m={1}
              ml={0}
              key={u._id}
              display="flex"
              justifyContent={"center"}
              alignItems="center"
              cursor="pointer"
            >
              <Avatar size="xs" src={u.pic} />
              <Text>@{u.username}</Text>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
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
              handleFunction={() => handleGroup(item)}
            />
          )}
        ></FlatList>
      )}
      <TouchableOpacity
        onPress={() => handlerSubmit()}
        className="bg-blue-600 w-[40%] h-[10%] items-center justify-center rounded-xl mt-2"
      >
        <Text className="text-xl text-white font-bold">Create</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default AddGroup;
