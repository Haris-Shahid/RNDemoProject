import AuthActions from '../Actions/AuthActions';
import * as firebase from 'firebase';
import { ImagePicker } from 'expo';
import { Alert, Icon } from 'react-native';

export default class AuthMiddleware {

    static UploadImage() {
        return async (dispatch) => {
            dispatch(AuthActions.imageUploading())
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 4],
                base64: true
            });
            if (!result.cancelled) {
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function (e) {
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', result.uri, true);
                    xhr.send(null);
                });
                const ref = firebase.storage().ref('user/' + result.uri)
                const snapshot = await ref.put(blob);
                blob.close();
                let url = await snapshot.ref.getDownloadURL();
                dispatch(AuthActions.imageUploaded(url))
            } else {
                dispatch(AuthActions.imageUploadingFailed())
            }
        }
    }

    static SignUpMiddleware(data, password) {
        return (dispatch) => {
            dispatch(AuthActions.authStart())
            firebase.auth()
                .createUserWithEmailAndPassword(data.email, password)
                .then(({ user }) => {
                    data.uid = user.uid;
                    firebase.database().ref('/').child(`user/${user.uid}`).set(data)
                        .then(() => {
                            dispatch(AuthActions.registerSuccessfull(data))
                        })
                })
                .catch((error) => {
                    let message = error.message;
                    dispatch(AuthActions.authfailed(message))
                })
        }
    }

    static LogInMiddleware(data) {
        return (dispatch) => {
            dispatch(AuthActions.authStart())
            firebase.auth()
                .signInWithEmailAndPassword(data.email, data.password)
                .then(({ user }) => {
                    firebase.database().ref('/').child(`user/${user.uid}`).once('value', (snap) => {
                        dispatch(AuthActions.loginSuccessfully(snap.val()))
                    })
                })
                .catch((error) => {
                    let message = error.message;
                    dispatch(AuthActions.authfailed(message))
                });
        }
    }

    static LoginWithFBMiddleware(token) {
        return (dispatch) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential)
                .then((user) => {
                    console.log(user, '//////////////////////////')
                    dispatch(AuthActions.loginSuccessfullyFB(user))
                })
                .catch((error) => {
                    let message = error.message;
                    dispatch(AuthActions.authfailed(message))
                })
        }
    }

    static forgetPassword(email) {
        return (dispatch) => {
            dispatch(AuthActions.authStart())
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    dispatch(AuthActions.fgPasswrod())
                }).catch((e) => {
                    dispatch(AuthActions.authfailed(e.message))
                })
        }
    }

    static checkAuth() {
        return (dispatch) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log(user, 'login user ////////////////')
                }
            })
        }
    }

}