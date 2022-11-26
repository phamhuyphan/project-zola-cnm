import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatInfoScreen from "../screens/ChatInfoScreen";
import MembersScreen from "../screens/MembersScreen";
const Stack = createNativeStackNavigator();
export default function ChatDrawerNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChatInfoScreen">
      <Stack.Screen name="ChatInfoScreen" component={ChatInfoScreen} />
      <Stack.Screen name="MembersScreen" component={MembersScreen} />
    </Stack.Navigator>
  );
}
