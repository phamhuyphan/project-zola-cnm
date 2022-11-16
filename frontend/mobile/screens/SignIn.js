import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { ChatState } from "../providers/ChatProvider";
import "localstorage-polyfill";
import { useNavigate } from "react-router-dom";
const link = "http://192.168.1.163:6000";
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();
  //let navigate = useNavigate;

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      //  toast({
      //    title: "Please fill all fields",
      //    status: "warning",
      //    duration: 2500,
      //    isClosable: true,
      //    position: "bottom",
      //  });
      console.log("1");
      console.log("11");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("7");
      const { data } = await axios.post(
        `${link}/api/user/login`,
        { email, password },
        config
      );
      //  toast({
      //    title: "Sign in successfully",
      //    status: "success",
      //    duration: 2500,
      //    isClosable: true,
      //    position: "bottom",
      //  });
      console.log("2");
      localStorage.setItem("userInfo", JSON.stringify(data));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setLoading(false);
      setUser(userInfo);
      navigation.navigate("ChatScreen");
    } catch (error) {
      //  toast({
      //    title: "Sign in failed! Your password or email address is invalid!  ",
      //    status: "error",
      //    duration: 2500,
      //    isClosable: true,
      //    position: "bottom",
      //  });
      console.log("3");
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-blue-700 max-w-full">
      <View className=" mt-[30%] items-center">
        <Text className="text-[50px] font-bold text-white">Welcome</Text>
      </View>
      <View className="items-center mt-10">
        <TextInput
          className="border-2 w-[300px] h-[50px] p-3 mt-5 rounded-lg bg-white"
          placeholder="Email"
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          className="border-2 w-[300px] h-[50px] p-3 mt-5 rounded-lg bg-white"
          placeholder="Password"
          onChangeText={(e) => setPassword(e)}
        />
        <TouchableOpacity className="w-[200px] h-[50px] items-center mt-1 ml-20">
          <Text className="text-[20px] font-bold text-white">
            forgot password, eh?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white rounded-full w-[110%] h-[60%] mt-[110%]  absolute right-20 items-center ">
        <TouchableOpacity
          className="w-[120px] h-[50px] items-center mt-7"
          onPress={submitHandler}
        >
          <Text className="text-[30px] font-bold text-blue-700">Sign In</Text>
        </TouchableOpacity>
        <View className="flex-row">
          <Text className="ml-16">Already have an account ?</Text>
          <TouchableOpacity className="w-[80px] h-[30px]">
            <Text className="text-[15px] font-bold text-blue-700">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-orange-600 rounded-full w-[107%] h-[60%] mt-[130%] absolute left-36"></View>
    </View>
  );
};

export default SignIn;
