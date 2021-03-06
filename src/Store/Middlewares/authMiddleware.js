import AuthActions from '../Actions/AuthActions';
import * as firebase from 'firebase';
import { ImagePicker } from 'expo';
import { AsyncStorage } from 'react-native';
import { Permissions, Camera } from 'expo';

export default class AuthMiddleware {

    static UploadImage() {
        return async (dispatch) => {
            dispatch(AuthActions.imageUploading())
            const cameraP = await Permissions.askAsync(Permissions.CAMERA);
            const carmeraRollP = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (carmeraRollP.status === 'granted') {
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

    static LogInMiddleware(data, nav) {
        return (dispatch) => {
            dispatch(AuthActions.authStart())
            firebase.auth()
                .signInWithEmailAndPassword(data.email, data.password)
                .then(({ user }) => {
                    firebase.database().ref('/').child(`user/${user.uid}`).once('value', (snap) => {
                        AsyncStorage.setItem('userToken', JSON.stringify({ user: snap.val() }))
                        dispatch(AuthActions.loginSuccessfully(snap.val()))
                        nav.navigate('homeScreen')
                    })
                })
                .catch((error) => {
                    let message = error.message;
                    dispatch(AuthActions.authfailed(message))
                });
        }
    }

    static LoginWithFBMiddleware(token, nav) {
        return async (dispatch) => {
            dispatch(AuthActions.authStart())
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential)
                .then(async (user) => {
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
                    const js = await response.json();
                    firebase.database().ref('/').child(`user/${user.uid}/`).once('value', async (snap) => {
                        let userData = {
                            name: js.name,
                            email: user.email,
                            profileImage: js.picture.data.url,
                            uid: user.uid
                        }
                        if (snap.val() === null) {
                            firebase.database().ref(`/user/${user.uid}/`).set(userData)
                        }
                        await AsyncStorage.setItem('userToken', JSON.stringify({ user: userData }))
                        dispatch(AuthActions.loginSuccessfullyFB(userData))
                        nav.navigate('homeScreen')
                    })
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

    static SignOutMiddleware(nav) {
        return (dispatch) => {
            firebase.auth().signOut().then(async () => {
                await AsyncStorage.clear();
                dispatch(AuthActions.signOut())
                nav.navigate('AuthLoading')
            })
                .catch((e) => alert(e))
        }
    }
}