import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { Heading } from "../components/Heading";

class TransportScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Heading style={styles.title}>KrushiGanudenu.LK</Heading>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    padding: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: 48,
  },
});

export default withNavigation(TransportScreen);
