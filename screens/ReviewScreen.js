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
import { withNavigation } from "react-navigation";
import { db } from "../database/db.js";
import firebase from "firebase";

class ReviewScreen extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      FarmerID: "",
      dataSource: [],
      isLoading: true,
      AllReviews: [],
    };
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.card}>
          <View style={{ marginLeft: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>{item.rating}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>{item.review}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  componentDidMount() {
    const reviews = db.ref("Farmers/" + this.state.FarmerID + "/reviews");
    reviews.on("value", (datasnap) => {
      const dataSource = [];
      datasnap.forEach((doc) => {
        dataSource.push({
          key: doc.key,
          review: doc.toJSON().comment,
          rating: doc.toJSON().rating,
          name: doc.toJSON().name,
        });
        this.setState({
          isLoading: false,
          dataSource: dataSource,
          AllReviews: dataSource,
        });
      });
    });
  }

  render() {
    const item = this.props.navigation.state.params;
    this.state.FarmerID = item.uid;
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" animating />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View style={styles.header}></View>
        <FlatList
          data={this.state.AllReviews}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 10,
    width: 350,
    marginTop: 5,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    marginLeft: "5%",
    height: 150,
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
  title: {
    color: "green",
    fontSize: 18,
    marginTop: 5,
  },
  text: {
    marginTop: 20,
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

export default withNavigation(ReviewScreen);
