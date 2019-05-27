import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import DonorActions from '../Actions/DonorActions';
import NotificationAction from '../Actions/NotificationAction';

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

    static handleAcceptBtnDetails(nav, donor, authUser) {
        return (dispatch) => {
            dispatch(DonorActions.isLoadingUser())
            firebase.database().ref(`/user/${authUser.uid}`).once('value', (snap) => {
                if (snap.val().donorsRequestList === null || !snap.val().donorsRequestList) {
                    let donorsRequestList = [{ accept: false, donorUid: donor.uid }]
                    firebase.database().ref(`/user/${authUser.uid}`).update({ donorsRequestList });
                    firebase.database().ref(`/user/${donor.uid}`).once('value', (snap) => {
                        if (snap.val().requestList) {
                            let requestList1 = snap.val().requestList;
                            var requestflag1 = false;
                            requestList1.map(r => {
                                if (r.requestUserUid === authUser.uid) {
                                    requestflag1 = true;
                                }
                            })
                            if (!requestflag1) {
                                requestList1.push({ requestUserUid: authUser.uid })
                            }
                            firebase.database().ref(`/user/${donor.uid}/requestList`).set(requestList1);
                        } else {
                            firebase.database().ref(`/user/${donor.uid}`).update({ requestList: [{ requestUserUid: authUser.uid }] });
                        }
                    })
                } else {
                    let donorsRequestList = snap.val().donorsRequestList;
                    var donorflag = false;
                    donorsRequestList.map(d => {
                        if (d.donorUid === donor.uid) {
                            donorflag = true;
                        }
                    })
                    if (!donorflag) {
                        donorsRequestList.push({ accept: false, donorUid: donor.uid })
                    }
                    firebase.database().ref(`/user/${authUser.uid}/donorsRequestList`).set(donorsRequestList);
                    firebase.database().ref(`/user/${donor.uid}`).once('value', (snap) => {
                        if (snap.val().requestList === null || !snap.val().requestList) {
                            firebase.database().ref(`/user/${donor.uid}`).update({ requestList: [{ requestUserUid: authUser.uid }] });
                        } else {
                            let requestList = snap.val().requestList;
                            var requestflag = false;
                            requestList.map(r => {
                                if (r.requestUserUid === authUser.uid) {
                                    requestflag = true;
                                }
                            })
                            if (!requestflag) {
                                requestList.push({ requestUserUid: authUser.uid })
                            }
                            firebase.database().ref(`/user/${donor.uid}/requestList`).set(requestList);
                        }
                    })
                }
                let response = fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    sound: 'default',
                    body: JSON.stringify({
                        to: donor.mobToken,
                        title: 'Request for a Blood',
                        body: `${authUser.name} need your help`,
                        data: {
                            from: authUser.uid,
                            to: donor.uid,
                            dueTo: 'Blood Request',
                            message: `Need your Blood...`,
                            requestSenderDetails: snap.val()
                        }
                    })
                })
                response.then(() => {
                    dispatch(DonorActions.RequestSend())
                    nav.goBack()
                }).catch((e) => alert(e))
            })
        }
    }

    static getNotification(uid) {
        return dispatch => {
            firebase.database().ref(`/user/${uid}/`).on('value', snap => {
                let notifications = [];
                if (snap.val().requestList) {
                    snap.val().requestList.map(v => {
                        firebase.database().ref(`/user/${v.requestUserUid}/`).on('value', snap => {
                            notifications.push(snap.val())
                        })
                    })
                    dispatch(NotificationAction.getNotification(notifications))
                } else {
                    dispatch(NotificationAction.emptyNotification())
                }
            })
        }
    }

    static cancelNotification(d, uid, notificate) {
        return dispatch => {
            let notificationArray = notificate
            notificationArray.map((v, i) => {
                if (d.uid === v.uid) {
                    notificationArray.splice(i, 1)
                }
            })
            dispatch(NotificationAction.updateNotification(notificationArray))
            firebase.database().ref(`/user/${uid}/`).once('value', snap => {
                let notification = snap.val().requestList;
                if (notification) {
                    notification.map((v, i) => {
                        if (v.requestUserUid === d.uid) {
                            notification.splice(i, 1)
                        }
                    })
                    firebase.database().ref(`/user/${uid}/requestList`).set(notification)
                }
                firebase.database().ref(`/user/${d.uid}/`).once('value', snap => {
                    let donorNotification = snap.val().donorsRequestList;
                    if (donorNotification) {
                        donorNotification.map((v, i) => {
                            if (v.donorUid === uid) {
                                donorNotification.splice(i, 1)
                            }
                        })
                        firebase.database().ref(`/user/${d.uid}/donorsRequestList`).set(donorNotification)
                    }
                })
            })
        }
    }

    static handleAcceptNotification(v, uid, auth) {
        return dispatch => {
            let donorRequestList = v.donorsRequestList;
            donorRequestList.forEach(e => {
                if (e.donorUid === uid) {
                    e.accept = true
                }
            });
            let response = fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                sound: 'default',
                body: JSON.stringify({
                    to: v.mobToken,
                    title: 'Blood Request Accepted',
                    body: `${auth.name} accept your blood request`,
                    data: {
                        dueTo: 'Accept Request',
                        message: `${auth.name} accept your blood request`,
                        acceptedUser: auth
                    }
                })
            })
            response.then(() => {
                // if notification send
            }).catch((e) => alert(e))
            firebase.database().ref(`/user/${uid}/requestList`).once('value', snap => {
                snap.val().map(e => {
                    if (e.requestUserUid !== v.uid) {
                        firebase.database().ref(`/user/${e.requestUserUid}/donorsRequestList/`).once('value', v => {
                            let donorsRequestList1 = []
                            v.val().map(d => {
                                if (d.donorUid !== uid) {
                                    donorsRequestList1.push(d)
                                }
                            })
                            firebase.database().ref(`/user/${e.requestUserUid}/donorsRequestList`).set(donorsRequestList1)
                        })
                    } else {
                        firebase.database().ref(`/user/${e.requestUserUid}/donorsRequestList`).set(donorRequestList);
                    }
                    firebase.database().ref(`/user/${uid}/requestList`).remove();
                })
                let futureDate = new Date();
                let newDate = futureDate.setDate(futureDate.getDate() + 40);
                firebase.database().ref(`/user/${uid}`).update({ disableTimer: newDate });
            })
        }
    }
}