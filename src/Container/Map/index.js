import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { Header, Left, Right, Body, Icon, Button } from 'native-base';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';
import Polyline from '@mapbox/polyline';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;;
import getDirections from 'react-native-google-maps-directions'

class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: { latitude: 0, longitude: 0, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
            donorLocation: { latitude: 0, longitude: 0 },
            userRegion: { latitude: 0, longitude: 0, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
            onUserLocation: false,
            coordinates: [{ latitude: 0, longitude: 0 }],
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
       this.watchLocation = navigator.geolocation.watchPosition(
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

componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchLocation);
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
        const origin = `${userRegion.latitude},${userRegion.longitude}`;
        const destination = `${donorLocation.latitude},${donorLocation.longitude}`;
        const APIKEY = 'AIzaSyAjcFjeniic4NP7DBQlv3OF2B1lFmocG8o ';

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                let points = Polyline.decode(responseJson.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                })
                this.setState({
                    coordinates: coords
                })
            }).catch(e => {
                alert('Sorry for the inconvenience! This service is unable  for now. We are open google map for your navigation')
                const data = {
                    source: {
                        latitude: userRegion.latitude,
                        longitude: userRegion.longitude
                    },
                    destination: {
                        latitude: donorLocation.latitude,
                        longitude: donorLocation.longitude
                    },
                    params: [
                        {
                            key: "travelmode",
                            value: "driving"
                        },
                        {
                            key: "dir_action",
                            value: "navigate"
                        }
                    ],
                }
                getDirections(data)
            })
    }


    render() {
        const { region, donorLocation, onUserLocation, coordinates, disableNavigate } = this.state;
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
                    provider="google"
                    initialRegion={region}
                    showsCompass={true}
                    ref={map => this.map = map}
                    showsUserLocation={true}
                    style={{ flex: 1 }} >
                    <MapView.Polyline
                        coordinates={coordinates}
                        strokeWidth={5}
                        strokeColor="red" />
                    <MapView.Marker coordinate={donorLocation} />
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

export default MapScreen;