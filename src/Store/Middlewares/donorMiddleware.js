import DonorActions from '../Actions/DonorActions';
import * as firebase from 'firebase';
import PushNotificationMiddleware from './pushNotificationMiddleware';
import AuthActions from '../Actions/AuthActions';

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
                        if (!snap.val()[key].donorsRequestList) {
                            dispatch(DonorActions.emptyDonorList());
                        }
                        dispatch(DonorActions.donorFormSubmit(snap.val()[key]))
                    }
                    if (snap.val()[key].bloodDonor) {
                        donors.push(snap.val()[key])
                    }
                    if (snap.val()[key].disableTimer) {
                        let newDate = new Date().getTime();
                        if (snap.val()[key].disableTimer <= newDate) {
                            firebase.database().ref(`/user/${key}/disableTimer`).remove();
                            firebase.database().ref('/user/').once('value', snap => {
                                for (let a in snap.val()) {
                                    if (snap.val()[a].donorsRequestList) {
                                        let donorsRequestList = snap.val()[a].donorsRequestList;
                                        donorsRequestList.map((v, i) => {
                                            if (v.donorUid === key && v.accept === true) {
                                                donorsRequestList.splice(i, 1)
                                                firebase.database().ref(`/user/${snap.val()[a].uid}/donorsRequestList`).set(donorsRequestList)
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
                dispatch(DonorActions.getAllDonors(donors))
                firebase.database().ref(`/user/${uid}/`).on('value', snap => {
                    dispatch(AuthActions.userDetail(snap.val()))
                })
            });
        }
    }
}