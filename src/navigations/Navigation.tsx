import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Скидки") {
            focused ? "blue" : "gray";
            return (
              <MaterialCommunityIcons
                name="brightness-percent"
                size={24}
                color={color}
              />
            );
          } else if (route.name === "Избранные") {
            return (
              <MaterialIcons
                name={"favorite-outline"}
                size={24}
                color={color}
              />
            );
          } else {
            return <MaterialIcons name="account-box" size={24} color={color} />;
          }
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Скидки" component={HomeScreen} />
      <Tab.Screen name="Избранные" component={FavoriteScreen} />
      <Tab.Screen name="Аккаунт" component={AccountScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Navigation;
