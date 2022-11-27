import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  Box,
  HStack,
  Avatar,
  Center,
  ScrollView,
  Modal,
  FormControl,
  Input,
  Button,
} from "native-base";
import { ChatState } from "../providers/ChatProvider";

export default function UserInfo({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { user } = ChatState();
  console.log(user);
  return (
    <Box
      flex={1}
      alignItems="center"
      safeAreaTop
      bg={{
        linearGradient: {
          colors: ["lightBlue.600", "violet.900"],
          start: [1, 0],
          end: [0, 1],
        },
      }}
    >
      {" "}
      <ScrollView w="full">
        <Box height="220" w="full" mt={100} alignItems="center">
          <Box height="220" w="93%" shadow="2" rounded="lg" bg="white:alpha.20">
            <Center className="mt-20">
              <Text className="text-lg text-white">@{user?.username}</Text>
              <Text className="font-bold text-2xl text-white">
                {user?.fullname}
              </Text>
              <Text className="text-lg text-white">{user?.email}</Text>
            </Center>
          </Box>
        </Box>
        <Box style={{ position: "absolute" }} w="full" alignItems="center">
          <Avatar
            size="180"
            bg="green.500"
            source={{
              uri: user?.pic,
            }}
          ></Avatar>
        </Box>
        <Box w="full" mt={5}>
          <HStack className="justify-evenly">
            <TouchableOpacity onPress={() => navigation.navigate("ChangeInfo")}>
              <Box
                height="170"
                w="170"
                shadow="2"
                rounded="lg"
                bg="white:alpha.20"
              >
                <Center>
                  {" "}
                  <Text className="text-white" style={{ fontSize: 130 }}>
                    ⟳
                  </Text>
                  <Text className="text-white"> Change Profile</Text> 
                </Center>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Box
                height="170"
                w="170"
                shadow="2"
                rounded="lg"
                bg="white:alpha.20"
              >
                <Center>
                  {" "}
                  <Text className="text-white" style={{ fontSize: 100 }}>
                    →
                  </Text>
                  <Text className="text-white">Change Pasword</Text>
                </Center>
              </Box>
            </TouchableOpacity>
          </HStack>

          <HStack className="justify-evenly">
            <TouchableOpacity
              className="mt-6 w-[93%]"
              onPress={() => navigation.navigate("Friend")}
            >
              <Box height="12" shadow="2" rounded="lg" bg="white:alpha.20">
                <Center flexDirection="row">
                  <Text className="text-white" style={{ fontSize: 40 }}>
                    ⎋{" "}
                  </Text>
                  <Text className="text-white">Sign Out</Text>
                </Center>
              </Box>
            </TouchableOpacity>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
