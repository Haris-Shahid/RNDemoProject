import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            coordinate: null,
            latitude: '',
            longitude: '',
        }
    }

    componentWillMount() {
        this._getLocationAsync();
    }

    async  _getLocationAsync() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log(location)
        const { latitude, longitude } = location.coords;
        let coordinate = { latitude: latitude, longitude: longitude }
        this.setState({ location, coordinate });
    }

    render() {
        console.log(this.state)
        return (
            <View style={styles.container} >
                <StatusBar hidden={true} />
                {this.state.location && <MapView
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    initialRegion={{ 
                        latitude:  this.state.coordinate.latitude,
                        longitude:  this.state.coordinate.longitude,
                        latitudeDelta:  0,
                        longitudeDelta:  0,
                    }}
                ><MapView.Marker coordinate={this.state.coordinate} />
                </MapView>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})

export default MapScreen;