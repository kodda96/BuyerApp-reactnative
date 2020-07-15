import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
import { FilledButton } from "../components/FilledButton";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { withNavigation } from "react-navigation";
import { db } from "../database/db.js";
import firebase from "firebase";

class OrderHistoryScreen extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
    this.state = {
      dataSource: [],
      isLoading: true,
      OrderHistory: [],
    };
  }

  handleDelete(item) {
    const order = db.ref("orders/" + item.key);
    Alert.alert("Delete Order", "Are you sure", [
      {
        text: "NO",
        onPress: () => console.warn("NO Pressed"),
        style: "cancel",
      },
      { text: "YES", onPress: () => order.update({ DeleteOrder: true }) },
    ]);
  }

  renderItem = ({ item }) => {
    if (!item.DeleteOrder) {
      return (
        <View>
          <View style={styles.card}>
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.title}>{item.Crop}</Text>
                  <Text style={{ color: "#c5c5c5", marginBottom: 20 }}>
                    {item.OrderDate}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    this.handleDelete(item);
                  }}
                >
                  <Icon name="ios-close-circle" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Price : Rs.</Text>
                <Text style={styles.text}>{item.Price}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Desired Price : Rs.</Text>
                <Text style={styles.text}>{item.DesiredPrice}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Quantity : </Text>
                <Text style={styles.text}>{item.Quantity}</Text>
                <Text style={styles.text}>Kg</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Farmer : </Text>
                <Text style={styles.text}>{item.Farmer}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.text}>Economic Center : </Text>
                <Text style={styles.text}>{item.economicCenter}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;
    const orders = db.ref("orders").orderByChild("BuyerId").equalTo(userId);
    orders.on("value", (datasnap) => {
      const dataSource = [];
      datasnap.forEach((doc) => {
        dataSource.push({
          key: doc.key,
          Farmer: doc.toJSON().Farmer,
          Crop: doc.toJSON().Crop,
          Price: doc.toJSON().Price,
          DesiredPrice: doc.toJSON().DesiredPrice,
          Quantity: doc.toJSON().Quantity,
          OrderDate: doc.toJSON().OrderDate,
          economicCenter: doc.toJSON().economicCenter,
          DeleteOrder: doc.toJSON().DeleteOrder,
        });
        this.setState({
          isLoading: false,
          dataSource: dataSource,
          OrderHistory: dataSource,
        });
      });
    });
  }

  searchCrops(cropName) {
    this.setState({
      OrderHistory: this.state.dataSource.filter((i) =>
        i.Crop.toLowerCase().includes(cropName.toLowerCase())
      ),
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" animating />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Animatable.View
            animation="slideInRight"
            duration={500}
            style={styles.textinput}
          >
            <Icon name="ios-search" style={styles.searchicon} />
            <TextInput
              placeholder="Enter Crop Name"
              style={styles.search}
              onChangeText={(text) => {
                this.searchCrops(text);
              }}
            />
          </Animatable.View>
        </View>
        <FlatList
          data={this.state.OrderHistory}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: 350,
    marginTop: 5,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    marginLeft: "5%",
    height: 200,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  textinput: {
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  searchicon: {
    fontSize: 24,
    marginLeft: 30,
  },
  search: {
    fontSize: 20,
    marginLeft: 15,
    width: "100%",
  },
  title: {
    color: "green",
    fontSize: 18,
    marginTop: 5,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 35,
    color: "red",
    flex: 1,
    marginRight: 10,
  },
  itemImage: {
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: "#19a119",
    height: 10,
    width: 100,
    marginTop: 15,
    marginRight: 4,
    alignSelf: "center",
  },
});

export default withNavigation(OrderHistoryScreen);
