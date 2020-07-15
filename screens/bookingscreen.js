import React, { Component, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import TimePicker from "react-native-24h-timepicker";
import axios from "../axioslist";

class bookingscreen extends Component {
  state = {
    time: "0:00",
    name: "tony",
    link: {
      uri: "",
    },
  };

  componentDidMount() {
    this.setState({
      link: {
        uri: "/drivers/" + this.props.navigation.getParam("name") + "/.json",
      },
    });
  }

  /* checkout() {
      // axios.patch('/drivers/' + this.props.navigation.getParam('name') + '/.json' , {time: this.state.time, booking: {lat : this.props.navigation.getParam('lat'), lng: this.props.navigation.getParam('lng')}})
      axios.patch('/drivers/' + this.props.navigation.getParam('name') + '/.json', {booking: {time: this.state.time, lat: this.props.navigation.getParam('lat'), lng: this.props.navigation.getParam('lng')}})
      .then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    } */

  checkout() {
    // axios.patch('/drivers/' + this.props.navigation.getParam('name') + '/.json' , {time: this.state.time, booking: {lat : this.props.navigation.getParam('lat'), lng: this.props.navigation.getParam('lng')}})
    axios
      .post("/farmerbookings.json", {
        farmername: "farmer_1",
        drivername: this.props.navigation.getParam("name"),
        farmernumer: "011698080",
        time: this.state.time,
        lat: this.props.navigation.getParam("lat"),
        lng: this.props.navigation.getParam("lng"),
      })
      .then((response) => {
        Alert.alert("Booking Submited");
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.navigation.navigate("Home");
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {
    return (
      // <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri:
            "https://images.unsplash.com/photo-1579992822406-2092a7bd5a36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80://images.unsplash.com/photo-1577549175702-422bcf9b2718?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1402&q=80",
        }}
      >
        <View style={styles.tile}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              backgroundColor: "white",
              padding: 20,
              marginBottom: 20,
            }}
          >
            <View style={styles.hold}>
              <Image
                source={{
                  uri:
                    "https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/manager_male_avatar_men_character_professions-512.png",
                }}
                style={styles.img}
              ></Image>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold" }}>Name of the driver</Text>
              <Text
                style={{ color: "#fa7916", fontWeight: "bold", fontSize: 20 }}
              >
                {" "}
                {this.props.navigation.getParam("name")}
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: "white" }}>
            <Button color="#fa7916" onPress={() => this.TimePicker.open()}>
              set pickup time
            </Button>
          </View>
          <Text style={styles.text}>{this.state.time}</Text>
          <TimePicker
            ref={(ref) => {
              this.TimePicker = ref;
            }}
            onCancel={() => this.onCancel()}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
          />
          {/*  <Text>{this.props.navigation.getParam('lat')}</Text>
        <Text>{this.props.navigation.getParam('lng')}</Text> */}
          <Button
            mode="contained"
            color="#fa7916"
            onPress={() => {
              this.checkout();
            }}
          >
            book
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#aff589",
    paddingTop: 100,
  },
  tile: {
    alignItems: "center",
    marginTop: 140,
  },
  text: {
    fontSize: 20,
    marginTop: 8,
    color: "#f7e91e",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },

  hold: {
    backgroundColor: "#fa7916",
    width: 80,
    borderRadius: 40,
  },
});

export default bookingscreen;
