import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Heading } from "../components/Heading";
import { FilledButton } from "../components/FilledButton";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import { YellowBox } from "react-native";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri:
            "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        }}
      >
        <View style={styles.container}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate("Market");
              }}
            >
              <Text style={styles.text}>Market Place</Text>
              <Icon name="ios-cart" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate("Booking");
              }}
            >
              <Text style={styles.text}>Transport</Text>
              <Icon name="ios-car" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate("OrderHistory");
              }}
            >
              <Text style={styles.text}>Your Orders</Text>
              <Icon name="ios-list" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate("OrderHistory");
              }}
            >
              <Text style={styles.text}>Farmers</Text>
              <Icon name="ios-person" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <FilledButton
            title={"Sign Out"}
            style={styles.signOut}
            onPress={() => {
              firebase.auth().signOut();
              this.props.navigation.navigate("Loading");
            }}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingTop: 200,
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    margin: 5,
    marginTop: 10,
    height: "100%",
    width: "50%",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "green",
  },
  title: {
    color: "green",
    marginBottom: 48,
  },
  icon: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 60,
    color: "black",
  },
  signOut: {
    marginTop: 130,
    backgroundColor: "#19a119",
    height: 10,
    width: 120,
    marginRight: 4,
    alignSelf: "center",
  },
});

export default withNavigation(HomeScreen);
