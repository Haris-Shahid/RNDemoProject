import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

export default class PushNotificationMiddleware {
    static PushNotificationPermission(uid) {
        return async dispatch => {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();
            firebase.database().ref(`/user/${uid}`).update({ mobToken: token })
        }
    }
}