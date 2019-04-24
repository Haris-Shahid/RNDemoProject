import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import { GET_NOTIFICATIONS } from '../constant';

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

    static getNotification(uid){
        return dispatch => {
            firebase.database().ref(`/user/${uid}/`).on('value' , snap => {
                let notifications = [];
                if(snap.val().notificationDetails){
                    snap.val().notificationDetails.map(v => {
                        firebase.database().ref(`/user/${v.uid}/`).on('value', snap => {
                           notifications.push(snap.val())
                        })
                    })
                    dispatch({
                        type: GET_NOTIFICATIONS,
                        notifications: notifications
                    })
                }
            })
        }
    }
}