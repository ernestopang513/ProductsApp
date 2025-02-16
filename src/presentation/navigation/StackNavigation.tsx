
import { createStackNavigator } from "@react-navigation/stack"
import { Text, View } from "react-native"
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { ProductScreen } from "../screens/product/ProductScreen";


export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProducScreen: {productId: string}
}

const Stack = createStackNavigator<RootStackParams>();


export const StackNavigation = () => {
  return (
    <Stack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={{
      headerShown: false,

    }}
    
    >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ProducScreen" component={ProductScreen} />
    </Stack.Navigator>
  )
}