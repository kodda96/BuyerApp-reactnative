import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { FilledButton } from "../components/FilledButton";
import { db } from "../database/db.js";
import { withNavigation } from "react-navigation";
import moment from "moment";
import { YellowBox } from "react-native";
import firebase from "firebase";

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      crop: "",
      Farmer: "",
      FarmerId: "",
      economicCenter: "",
      Buyer: "",
      DesiredPrice: "",
      Price: "",
      Quantity: "",
      Mobile: "",
      CurrentDate: new Date(),
      OrderDate: "",
      Accpet: false,
      Reject: false,
      CompleteOrder: false,
      DeleteOrder: false,
    };
  }

  pushOrder() {
    const user = firebase.auth().currentUser;
    const orders = db.ref("orders");
    orders.push({
      BuyerId: user.uid,
      Crop: this.state.crop,
      Farmer: this.state.Farmer,
      FarmerId: this.state.FarmerId,
      Quantity: this.state.Quantity,
      DesiredPrice: this.state.DesiredPrice,
      Price: this.state.Price,
      economicCenter: this.state.economicCenter,
      OrderDate: this.state.OrderDate,
      Buyer: this.state.Buyer,
      Mobile: this.state.Mobile,
      Accept: this.state.Accpet,
      Reject: this.state.Reject,
      CompleteOrder: this.state.CompleteOrder,
      DeleteOrder: this.state.DeleteOrder,
    });
    this.props.navigation.navigate("Market");
    Alert.alert("Your Order Has Been Submitted");
  }

  render() {
    const item = this.props.navigation.state.params;
    this.state.crop = item.crop;
    this.state.Farmer = item.name;
    this.state.FarmerId = item.uid;
    this.state.Price = item.price;
    this.state.economicCenter = item.economicCenter;
    const today = this.state.CurrentDate;
    this.state.OrderDate = moment(today).format("MMM Do YYYY");
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri:
            "https://images.unsplash.com/photo-1526046881250-dbec3e06414c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        }}
      >
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={styles.container}>
              <Heading style={styles.title}>KrushiGanudenu.LK</Heading>
              <TextInput
                style={styles.input}
                placeholder={"Your Name"}
                placeholderTextColor="#606060"
                value={this.state.Buyer}
                onChangeText={(text) => this.setState({ Buyer: text })}
              />
              <TextInput
                style={styles.input}
                placeholder={"Quantity(kg)"}
                placeholderTextColor="#606060"
                value={this.state.Quantity}
                keyboardType="number-pad"
                onChangeText={(text) => this.setState({ Quantity: text })}
              />
              <TextInput
                style={styles.input}
                placeholder={"Your Desired Price(Rs)"}
                placeholderTextColor="#606060"
                value={this.state.DesiredPrice}
                keyboardType="number-pad"
                onChangeText={(text) => this.setState({ DesiredPrice: text })}
              />
              <TextInput
                style={styles.input}
                placeholder={"Mobile Number"}
                placeholderTextColor="#606060"
                value={this.state.Mobile}
                keyboardType="number-pad"
                onChangeText={(text) => this.setState({ Mobile: text })}
              />
              <FilledButton
                title={"Place Order"}
                style={styles.orderButton}
                onPress={() => {
                  if (
                    this.state.Buyer == "" ||
                    this.state.Quantity == "" ||
                    this.state.DesiredPrice == "" ||
                    this.state.Mobile == ""
                  ) {
                    Alert.alert("Please Enter all the details");
                  } else {
                    this.pushOrder();
                  }
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
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
    color: "green",
    marginBottom: 48,
  },
  input: {
    marginVertical: 8,
    backgroundColor: "#ccc",
    width: 300,
    padding: 10,
    borderRadius: 8,
  },
  orderButton: {
    backgroundColor: "#19a119",
    marginVertical: 32,
  },
});

export default withNavigation(OrderScreen);
