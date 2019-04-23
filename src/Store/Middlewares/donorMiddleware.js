import DonorActions from '../Actions/DonorActions';
import * as firebase from 'firebase';
import PushNotificationMiddleware from './pushNotificationMiddleware';

export default class DonorMiddleware {
    static submitDonorDetails(obj, uid, nav) {
        return (dispatch) => {
            dispatch(DonorActions.isLoadingUser())
            firebase.database().ref(`/user/${uid}`).update(obj)
                .then(() => {
                    dispatch(DonorActions.donorFormSubmit(obj))
                    nav.goBack()
                })
                .catch(e => alert(e))
        }
    }

    static GetDonors(uid) {
        return async (dispatch) => {
            dispatch(DonorActions.isLoadingUser())
            await dispatch(PushNotificationMiddleware.PushNotificationPermission(uid))
            firebase.database().ref(`/user/`).on('value', snap => {
                let donors = [];
                for (let key in snap.val()) {
                    if (snap.val()[key].uid === uid) {
                        dispatch(DonorActions.donorFormSubmit(snap.val()[key]))
                    }
                    if (snap.val()[key].bloodDonor) {
                        donors.push(snap.val()[key])
                    }
                }
                dispatch(DonorActions.getAllDonors(donors))
            });
        }
    }
    static handleAcceptBtnDetails(userUid, nav, udetail) {
        return (dispatch) => {
            dispatch(DonorActions.isLoadingUser())
            let response = fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: udetail.mobToken,
                    sound: 'default',
                    title: 'Request for a Blood',
                    body: `${udetail.name} need your help`,
                    data: {
                        from: udetail.uid,
                        to: userUid,
                        message: `${udetail.name} need your help`,
                        userDetail: udetail
                    }
                })
            })
            response.then(() => {
                firebase.database().ref(`/user/${udetail.uid}`).once('value', (snap) => {
                    if (snap.val().notificationDetails === null || !snap.val().notificationDetails) {
                        let notificationDetails = {
                            from: [{ accept: false, uid: userUid, status: 'PENDING' }]
                        }
                        firebase.database().ref(`/user/${userUid}`).update({ requestSendTo: [{uid: udetail.uid, pendingStatus: false}] });
                        firebase.database().ref(`/user/${udetail.uid}`).update({ notificationDetails });
                    } else {
                        firebase.database().ref(`/user/${udetail.uid}/notificationDetails/from`).once('value', (snap) => {
                            var flag = false;
                            let nList = [...snap.val()];
                            nList.map((list) => {
                                if (list.uid === userUid) {
                                    return flag = true;
                                }
                            })
                            if (!flag) {
                                nList.push({ accept: false, uid: userUid, status: 'PENDING' })
                            }
                            firebase.database().ref(`/user/${userUid}`).once('value', (snap) => {
                                if (snap.val().requestSendTo === null || !snap.val().requestSendTo) {
                                    firebase.database().ref(`/user/${userUid}`).update({ requestSendTo: [{uid: udetail.uid, pendingStatus: false}] });
                                } else {
                                    firebase.database().ref(`/user/${userUid}/requestSendTo`).once('value', (snap) => {
                                        var flag1 = false;
                                        let nList1 = [...snap.val()];
                                        nList1.map((list) => {
                                            if (list.uid === udetail.uid) {
                                                return flag1 = true;
                                            }
                                        })
                                        if (!flag1) {
                                            nList1.push({uid: udetail.uid, pendingStatus: false})
                                        }
                                        firebase.database().ref(`/user/${userUid}/requestSendTo`).set(nList1);
                                    })
                                }
                            })

                            firebase.database().ref(`/user/${udetail.uid}/notificationDetails/from`).set(nList)
                        })

                    }
                })
            })
                .catch((e) => alert(e))
            dispatch(DonorActions.AcceptedDonor())
            // dispatch(DonorActions.AcceptedDonor(AcceptedDonors))
            // }
            nav.goBack()
            // })
        }
    }
}