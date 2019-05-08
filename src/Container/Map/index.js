import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { Header, Left, Right, Body, Icon, Button } from 'native-base';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';

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
        const source = {
            latitude: userRegion.latitude,
            location: userRegion.longitude
        }
        const destination = {
            latitude: donorLocation.latitude,
            longitude: donorLocation.longitude
        }
        this.getDirections(source, destination)
    }
    async getDirections(startLoc, destinationLoc) {
        try {
            const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&mode=navigate&key=AIzaSyDQTgJofYEtp7ZgaJNM_8ZAmOAeK4_uftc`);
            const respJson = await resp.json();
            const points = MapView.Polyline.decode(respJson.routes[0].overview_polyline.points);
            const coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1],
                };
            });
            const newCoords = [...this.state.coordinates, coords]
            this.setState({ coordinates: newCoords });
            return coords;
        } catch (error) {
            alert(error);
        }
    }

    render() {
        const { region, donorLocation, onUserLocation, userRegion } = this.state;
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
                    <MapView.Marker coordinate={donorLocation} />
                    {
                        this.state.coordinates.length !== 0 ?
                            this.state.coordinates.map((coords, i) => {
                                return (
                                    <MapView.Polyline index={i} key={i} coordinates={coords} strokeWidth={2} strokeColor="blue" />
                                )
                            }) : null
                    }
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

export default MapScreen;