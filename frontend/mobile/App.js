import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatProvider from "./providers/ChatProvider";
import ChatScreen from "./screens/ChatScreen";
import ScreenStart from "./screens/ScreenStart";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { NativeBaseProvider } from "native-base";
import MessageScreen from "./screens/MessageScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <ChatProvider>
          <Stack.Navigator>
            <Stack.Screen name="ScreenStart" component={ScreenStart} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
          </Stack.Navigator>
        </ChatProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
