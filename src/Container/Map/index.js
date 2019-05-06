import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { Header, Left, Right, Body, Icon } from 'native-base';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;;

class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 0, longitude: 0, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
            },
            donorLocation: {
                latitude: 0, longitude: 0
            },
            userRegion: {
                latitude: 0, longitude: 0, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
            },
            onUserLocation: false
        }
    }

    async componentWillMount() {
        let UserLocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        const { location } = this.props.navigation.getParam("donor");
        let userRegion = {
            latitude: UserLocation.coords.latitude,
            longitude: UserLocation.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
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
        this.setState({
            region, donorLocation, userRegion
        })
    }

    myLocation() {
        this.map.animateToRegion(this.state.userRegion)
        this.setState({ onUserLocation: true })
    }

    handleMapDrap(e) {
        const { userRegion } = this.state;
        if(e.latitude){
            if (userRegion.latitude.toFixed(7) === e.latitude.toFixed(7) && userRegion.longitude.toFixed(7) === e.longitude.toFixed(7)) {
                this.setState({ onUserLocation: true })
            } else {
                this.setState({ onUserLocation: false })
            }
        }else{
            if (userRegion.latitude.toFixed(7) === e.nativeEvent.latitude.toFixed(7) && userRegion.longitude.toFixed(7) === e.nativeEvent.longitude.toFixed(7)) {
                this.setState({ onUserLocation: true })
            } else {
                this.setState({ onUserLocation: false })
            }
        }
    }

    render() {
        const { region, donorLocation, onUserLocation } = this.state;
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
                    initialRegion={region}
                    onRegionChangeComplete={e => this.handleMapDrap(e)}
                    ref={map => this.map = map}
                    onPanDrag={e => this.handleMapDrap(e)}
                    showsUserLocation={true}
                    style={{ flex: 1 }} >
                    <MapView.Marker coordinate={donorLocation} />
                </MapView>
                <TouchableOpacity onPress={() => this.myLocation()} style={styles.locationIconCont} >
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
    locationIcon: {
        fontSize: scale(25),
        color: '#000'
    }
})

export default MapScreen;