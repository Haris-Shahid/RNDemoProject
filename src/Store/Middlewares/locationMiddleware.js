import * as firebase from 'firebase';
import { Permissions, Location } from 'expo';



export default class LocationMiddleware {
    static getUserLocation(uid) {
        return async dispatch => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                let region = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
                firebase.database().ref(`/user/${uid}`).update({ location: region })
            }
        }
    }
}
