import DonorActions from '../Actions/DonorActions';
import * as firebase from 'firebase';
import { ImagePicker } from 'expo';
import { AsyncStorage } from 'react-native';

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
                    if(snap.val()[key].uid === uid){
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
}