import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { Header, Left, Right, Body, Icon, Button } from 'native-base';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';
import Polyline from '@mapbox/polyline';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;;

class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: { latitude: 0, longitude: 0, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
            donorLocation: { latitude: 0, longitude: 0 },
            userRegion: { latitude: 0, longitude: 0, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
            onUserLocation: false,
            coordinates: []
        }
    }

    componentWillMount() {
        this.getUserLocation()
        this.getDonorLocation()
    }

    componentWillReceiveProps() {
        this.getDonorLocation()
    }

    getUserLocation() {
        navigator.geolocation.watchPosition(
            (position) => {
                let userRegion = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
                this.setState({ userRegion })
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 },
        );
    }


    getDonorLocation() {
        const { location } = this.props.navigation.getParam("donor");
        let region = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        let donorLocation = {
            latitude: location.latitude,
            longitude: location.longitude,
        }
        this.setState({ region, donorLocation })
    }


    animateToMyRegion() {
        this.map.animateToRegion(this.state.userRegion);
        this.setState({ onUserLocation: true })
    }

    handleRegionChange(e) {
        this.setState({
            onUserLocation: false
        })
    }

    handleGetDirection() {
        const { donorLocation, userRegion } = this.state;
        const mode = 'driving';

        const point = "kjmvC}jfxK]b@^`@vCrCsNjR}DrFw@tAmCdHqC`HqA|CcOvRQNQDM?E^CvBJr@D@VNJNF\\?VKXQPWHUAYKS[EO]Wg@UcCk@iHgB}@OoAIgC@w@A_BNkEb@oBT{BVoBPi@BoC\\eAHk@HQF_PnBaAN{@LABGDG@Q?iBFaCPuCVoHj@wDRgG\\eH`@iG\\e@P}@LoB^YJEDGLC^T|@l@zAjBrDHLMNuDtFoDnFsAzBiGzIw@fA@ZNdA"
        try {
            // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            // let respJson = await resp.json();
            let points = Polyline.decode(point);
            // let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coordinates: coords })
        } catch (error) {
            alert(error)
        }

        // const origin = `${userRegion.latitude} ${userRegion.longitude}`;
        // const destination = `${donorLocation.latitude} ${donorLocation.longitude}`;
        // const APIKEY = 'AIzaSyDQTgJofYEtp7ZgaJNM_8ZAmOAeK4_uftc';
        // const APIKEY = 'AIzaSyDD9VHVK_eVmAK8nwHWBCVVB-gbxA6RTdI';
        // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
        // const AccessToken = 'pk.eyJ1IjoiaGFyaXNzaGFoaWQiLCJhIjoiY2p2ZzdzbThzMDRqYzQzbW16NzV2NmR1YiJ9.5Zl82w0SfNvy_cQ5hkPGzw';
        // const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${userRegion.latitude},${userRegion.longitude};${donorLocation.latitude},${donorLocation.longitude}?geometries=geojson&access_token=${AccessToken}`;
        // fetch(url)
        //     .then(response => response.json())
        //     .then(responseJson => {
        //         let coordinates = [];
        //         responseJson.routes[0].geometry.coordinates.map(v => {
        //             coordinates.push({
        //                 latitude: v[0],
        //                 longitude: v[1]
        //             })
        //         })
        //         this.setState({
        //             coordinates
        //         })
        //     }).catch(e => alert(e));

    }


    render() {
        const { region, donorLocation, onUserLocation, coordinates, userRegion } = this.state;
        console.log(coordinates, '///////////////')
        return (
            <View style={{ flex: 1 }} >
                <Header style={{ backgroundColor: "#bb0a1e", paddingBottom: Platform.OS === 'android' ? 0 : verticalScale(15) }} >
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Icon name='ios-arrow-back' style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.title}>Donor Location</Text>
                    </Body>
                    <Right><View /></Right>
                </Header>
                <MapView
                    onPanDrag={(e) => this.handleRegionChange(e)}
                    initialRegion={region}
                    ref={map => this.map = map}
                    showsUserLocation={true}
                    style={{ flex: 1 }} >
                    <MapView.Polyline
                        coordinates={coordinates}
                        strokeWidth={5}
                        strokeColor="red" />
                    {/* <MapView.Polyline
                        coordinates={coordinates}
                        strokeWidth={10}
                        strokeColor="#00a8ff"
                        lineCap="round"
                    /> */}
                    {/* <MapView.Marker coordinate={donorLocation} /> */}
                    {/* {
                        coordinates.length !== 0 && <MapView.Polyline coordinates={coordinates} strokeWidth={2} strokeColor="blue" />
                    } */}
                </MapView>
                <TouchableOpacity style={styles.navigateBtn} onPress={() => this.handleGetDirection()} >
                    <Text style={{ color: '#000', fontSize: 18 }} >Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.animateToMyRegion()} style={styles.locationIconCont} >
                    <Icon name='md-locate' style={[styles.locationIcon, { color: onUserLocation ? 'blue' : '#000' }]} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: moderateScale(20)
    },
    locationIconCont: {
        position: 'absolute',
        width: scale(45),
        height: scale(45),
        backgroundColor: '#fff',
        left: width - 70,
        bottom: 20,
        borderRadius: 50,
        shadowColor: '#000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigateBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        position: 'absolute',
        left: 20,
        bottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    locationIcon: {
        fontSize: scale(25),
        color: '#000'
    }
})

function decode(t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
        a = null, h = 0, i = 0;
        do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
        while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
        do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5;
        while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
    }
    return d = d.map(function (t) {
        return { latitude: t[0], longitude: t[1] }
    })
}


export default MapScreen;