import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { FilledButton } from "../components/FilledButton";
import { TextButton } from "../components/TextButton";
import { withNavigation } from "react-navigation";
import firebase from "firebase";
import { YellowBox } from "react-native";

class LoginScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
    };
  }

  handleLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Home"))
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Heading style={styles.title}>KrushiGanudenu.LK</Heading>
        {this.state.errorMessage && (
          <Text style={{ color: "red", marginBottom: 15 }}>
            {this.state.errorMessage}
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder={"Email"}
          placeholderTextColor="#606060"
          autoCompleteType="off"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder={"Password"}
          placeholderTextColor="#606060"
          secureTextEntry
          autoCompleteType="off"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <FilledButton
          title={"Login"}
          style={styles.loginButton}
          onPress={() => {
            this.handleLogin();
          }}
        />
        <TextButton
          title={"Don't Have a account? Create one"}
          onPress={() => {
            this.props.navigation.navigate("SignUp");
          }}
        />
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
    backgroundColor: "#d2f8d2",
  },
  title: {
    color: "green",
    marginBottom: 80,
  },
  input: {
    backgroundColor: "#ccc",
    width: 300,
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  loginButton: {
    backgroundColor: "green",
    marginVertical: 32,
  },
});

export default withNavigation(LoginScreen);
