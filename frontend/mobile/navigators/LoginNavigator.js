import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatInfoScreen from "../screens/ChatInfoScreen";
import MessageScreen from "../screens/MessageScreen";

import ScreenStart from "../screens/ScreenStart";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import AddGroup from "../screens/AddGroup";

import ChatDrawerNavigator from "./ChatDrawerNavigator";
import ChatNavigator from "./ChatNavigator";
import ChatPersonDetail from "../screens/ChatPersonDetail";
const Stack = createNativeStackNavigator();
export function LoginNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ScreenStart"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ScreenStart" component={ScreenStart} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="AddGroup" component={AddGroup} />
      <Stack.Screen name="ChatPersonDetail" component={ChatPersonDetail} />

      <Stack.Screen name="ChatNavigator" component={ChatNavigator} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChatDrawerNavigator"
        component={ChatDrawerNavigator}
      />
    </Stack.Navigator>
  );
}

export default LoginNavigator;
