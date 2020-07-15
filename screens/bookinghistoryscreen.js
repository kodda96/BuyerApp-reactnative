import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "../axioslist";
import { db } from "../database/db.js";
import { FlatList, ScrollView } from "react-native-gesture-handler";

class BookinghistoryScreen extends Component {
  state = {
    trips: [],
  };

  async componentDidMount() {
    try {
      db.ref("confirmedbookings").on("value", (snapshot) => {
        let trips = [];
        snapshot.forEach((snap) => {
          trips.push(snap.val());
        });
        this.setState({ trips });
        console.log(this.state.trips);
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.state.trips.map((trip) => {
            return (
              <View style={styles.tile}>
                {trip.farmer_name == "farmer_1" ? (
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>Confirmed time</Text>
                      <Text>{trip.date}</Text>
                    </View>
                    <Text>{trip.driver_name}</Text>
                    <Text>{trip.farmer_name}</Text>
                    <Text>{trip.status}</Text>
                    <Text>{trip.time}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    padding: 20,
  },
});
export default BookinghistoryScreen;
