import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ScreenStart = ({ navigation }) => {
  return (
    <View className="flex-1 bg-blue-700 max-w-full">
      <View className=" mt-[60%] items-center mr-[50px]">
        <Text className="text-[50px] font-bold text-white">
          Welcome to Zola
        </Text>
        <Text className="text-[25px] font-bold text-white">
          Ứng dụng mạng xã hội hot nhất hiện nay
        </Text>
      </View>
      <View className="bg-white rounded-full w-[110%] h-[60%] mt-[110%]  absolute right-20 items-center ">
        <TouchableOpacity
          className="w-[120px] h-[50px] items-center mt-7"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text className="text-[30px] font-bold text-blue-700">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex-row p-1">
          {/* <Text className="ml-16 bg-gray-500">Already have an account ?</Text> */}
          <TouchableOpacity
            className="w-[80px] h-[30px] ml-2"
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text className="text-[15px] font-bold text-blue-700">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-orange-600 rounded-full w-[107%] h-[60%] mt-[130%] absolute left-36"></View>
    </View>
  );
};

export default ScreenStart;
