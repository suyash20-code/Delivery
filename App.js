import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store.js";

import tw from "twrnc";
import HomeScreen from "./screens/HomeScreen.js";
import RestaurantScreen from "./screens/RestaurantScreen.js";
import BasketScreen from "./screens/BasketScreen.js";
import PreparingOrderScreen from "./screens/PreparingOrderScreen.js";
import DeliveryScreen from "./screens/DeliveryScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "DELIVERO🍕",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#c5e3e8",
              },
            }}
          />
          <Stack.Screen
            name="Restaurant"
            component={RestaurantScreen}
            options={{
              title: "Restaurants🏠",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#c5e3e8",
              },
            }}
          />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              title: "Basket",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#c5e3e8",
              },
            }}
          />
          <Stack.Screen
            name="PreparingOrder"
            component={PreparingOrderScreen}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />

          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              presentation: "modal",
              // title: "Basket",
              headerTitleAlign: "center",
              headerBackVisible:false,
             headerShadowVisible:false,
              headerStyle: {
                backgroundColor: "#00CCBB",
              },
            }}
          />
        </Stack.Navigator>
        {/* <Text style={tw.style('text-2xl font-bold text-blue-500')}>suyash padwal</Text> */}
      </Provider>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
