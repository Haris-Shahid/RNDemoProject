import DonorActions from '../Actions/DonorActions';
import * as firebase from 'firebase';

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
        return (dispatch) => {
            dispatch(DonorActions.isLoadingUser())
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
    static handleAcceptBtnDetails(uid, userUid, nav) {
        return (dispatch) => {
            dispatch(DonorActions.isLoadingUser())
            firebase.database().ref(`/user/${userUid}`).once('value', (snap) => {
                if(snap.val().AcceptedDonor === null || !snap.val().AcceptedDonor){
                    let AcceptedDonor = [];
                    AcceptedDonor.push(uid)
                    firebase.database().ref(`/user/${userUid}`).update(AcceptedDonor)
                    dispatch(DonorActions.AcceptedDonor(AcceptedDonor))
                }else{
                    let AcceptedDonor = snap.val().AcceptedDonor;
                    AcceptedDonor.push(uid)
                    firebase.database().ref(`/user/${userUid}`).update(AcceptedDonor)
                    dispatch(DonorActions.AcceptedDonor(AcceptedDonor))
                }
                nav.goBack()
            })
        }
    }
}