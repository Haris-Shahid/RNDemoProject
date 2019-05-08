import * as firebase from 'firebase';
import { Permissions, Location } from 'expo';



export default class LocationMiddleware {
    static getUserLocation(uid) {
        return async dispatch => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                navigator.geolocation.watchPosition(
                    (position) => {
                        let region = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        }
                        firebase.database().ref(`/user/${uid}`).update({ location: region })
                    },
                    (error) => alert(error.message),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 },
                );
            }
        }
    }
}
