import { View, Text, SafeAreaView, TextInput } from "react-native";
import React from "react";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <View className="bg-slate-500 p-6">
        <Text className=" text-3xl">Name</Text>
        <TextInput className="mt-4 bg-white rounded-2xl border  "></TextInput>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
