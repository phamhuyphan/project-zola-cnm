import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Route } from "react-router-dom";
import { Router } from "react-router-dom";
import ChatProvider from "./providers/ChatProvider";
import ChatScreen from "./screens/ChatScreen";
import ScreenStart from "./screens/ScreenStart";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <ChatProvider>
        <Stack.Navigator>
          <Stack.Screen name="ScreenStart" component={ScreenStart} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </ChatProvider>
    </NavigationContainer>
  );
}
