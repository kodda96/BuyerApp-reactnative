import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';

// const landingScreen = props => {
    class landingScreen extends Component {

    static navigationOptions = {
        // title: 'Explore Sri Lanka',
        // headerStyle: {
        //   backgroundColor: /* '#f4511e' */ Platform.OS === 'android' ? 'yellow' : '#d303fc',
        // position: 'absolute', backgroundColor: 'transparent', zIndex: 100, /* top: 0, left: 0, right: 0 */
        // },
        headerTransparent: {position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0},
        headerTintColor: 'white',
        headerTitle: 'Book delivery',
        
            headerTitleStyle: { 
                fontFamily: 'sans-serif-light'
             },
            }
    render (){        
    return (
        <ImageBackground style={{flex: 1}} source={{uri: 'https://images.unsplash.com/photo-1528505086635-4c69d5f10908?ixlib=rb-1.2.1&auto=format&fit=crop&w=1389&q=80://images.unsplash.com/photo-1515113216643-09b1888ee9d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80://images.unsplash.com/photo-1503762687835-129cc7a277e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1576&q=80'}}>
        <View style={styles.main}>
            <View style={styles.btn}>
            {/* <Button mode="contained" onPress={() => {props.navigation.navigate('List')}}>book delivery</Button> */}
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('List')}}><View style={{alignItems: 'center'}}>
        <View style={{height: 200, width: 200, textAlign:'center', backgroundColor: 'rgba(255,255,255, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}>
        <Image style={{height:150, width: 150}} source={require('../assets/eastwood-delivery.png')}></Image>
        <Text style={{textAlign: 'center', fontSize: 16}}>BOOK DELIVERY</Text></View>
        </View>
        </TouchableOpacity>
            </View>

            <View style={styles.btn1}>
            {/* <Button mode="contained" onPress={() => {props.navigation.navigate('List')}}>book delivery</Button> */}
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('History')}}><View style={{alignItems: 'center'}}>
        <View style={{height: 200, width: 200, textAlign:'center', backgroundColor: 'rgba(255,255,255, 0.5)', alignItems: 'center', justifyContent:'center', borderRadius: 6}}>
        <Image style={{height:150, width: 150}} source={require('../assets/hugo-no-messages.png')}></Image>
        <Text style={{textAlign: 'center', fontSize: 16}}>BOOKING HISTORY</Text></View>
        </View>
        </TouchableOpacity>
            </View>

            </View>
        </ImageBackground>
    )
    }
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 208,
        width: 200
    },
    btn1: {
        marginTop: 20,
        width: 200
    },
    main: {
        alignItems: 'center'
    }
})

export default landingScreen;