import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderNavigator from "./navigation/OrderNavigator";
import UserNavigator from "./navigation/UserNavigator";

export default function App() {
  return <OrderNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
