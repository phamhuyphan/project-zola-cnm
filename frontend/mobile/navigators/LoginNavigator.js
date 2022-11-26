import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddGroup from "../screens/AddGroup";
import MessageScreen from "../screens/MessageScreen";

import ScreenStart from "../screens/ScreenStart";
import SearchChat from "../screens/SearchChat";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ChatNavigator from "./ChatNavigator";
const Stack = createNativeStackNavigator();
export function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="ScreenStart">
      <Stack.Screen name="ScreenStart" component={ScreenStart} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="SearchChat" component={SearchChat} />
    </Stack.Navigator>
  );
}

export default LoginNavigator;
