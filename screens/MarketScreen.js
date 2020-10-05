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
} from "react-native";
import { YellowBox } from "react-native";
import _ from "lodash";
import { FilledButton } from "../components/FilledButton";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { withNavigation } from "react-navigation";
import { db } from "../database/db.js";

class MarketScreen extends Component {
  constructor() {
    super();
    console.disableYellowBox = true;
    this.state = {
      dataSource: [],
      isLoading: true,
      filteredcrops: [],
    };
  }

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderRadius: 5,
          borderColor: "green",
          borderWidth: 2,
          marginBottom: 1,
        }}
      >
        <Image style={styles.itemImage} source={{ uri: item.image }} />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 18, color: "green", marginBottom: 15 }}>
            {item.crop}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.items}>Price(1kg): </Text>
            <Text style={styles.items}>{item.price}</Text>
            <Text style={styles.items}>Rs</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.items}>Quantity: </Text>
            <Text style={styles.items}>{item.quantity}</Text>
            <Text style={styles.items}>kg </Text>
          </View>
          <View>
            <Text style={styles.items}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.items}>{item.economicCenter}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <FilledButton
            title={"Order"}
            style={styles.orderButton}
            onPress={() => {
              this.props.navigation.navigate("Order", item);
            }}
          />
          <View style={{ height: 5 }}></View>
          <FilledButton
            title={"Reviews"}
            style={styles.orderButton}
            onPress={() => {
              this.props.navigation.navigate("Reviews", item);
            }}
          />
        </View>
      </View>
    );
  };

  componentDidMount() {
    const myvegetables = db.ref("Stocks");
    myvegetables.on("value", (datasnap) => {
      const dataSource = [];
      datasnap.forEach((doc) => {
        dataSource.push({
          key: doc.key,
          name: doc.toJSON().name,
          crop: doc.toJSON().crop,
          price: doc.toJSON().price,
          quantity: doc.toJSON().quantity,
          image: doc.toJSON().image,
          uid: doc.toJSON().uid,
          economicCenter: doc.toJSON().economicCenter,
        });
        this.setState({
          isLoading: false,
          dataSource: dataSource,
          filteredcrops: dataSource,
        });
      });
    });
  }

  searchCrops(cropName) {
    this.setState({
      filteredcrops: this.state.dataSource.filter((i) =>
        i.crop.toLowerCase().includes(cropName.toLowerCase())
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
              placeholder="Search crops"
              style={styles.search}
              onChangeText={(text) => {
                this.searchCrops(text);
              }}
            />
          </Animatable.View>
        </View>
        <FlatList
          data={this.state.filteredcrops}
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
  items: {
    fontSize: 15,
  },
  itemImage: {
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  orderButton: {
    backgroundColor: "#19a119",
    height: 10,
    width: 107,
    marginRight: 4,
    alignSelf: "center",
  },
});

export default withNavigation(MarketScreen);
