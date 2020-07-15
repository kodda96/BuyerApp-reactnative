import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function Input({ style, ...props }) {
  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      placeholderTextColor="black"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ccc",
    width: 300,
    padding: 10,
    borderRadius: 8,
  },
});
