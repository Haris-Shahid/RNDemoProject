import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import ChatAction from '../Actions/ChatAction';

export default class MessageMiddleware {
    static handleMessages(message, name, token) {
        return dispatch => {
            firebase.database().ref('/chat').once('value', snap => {
                if (snap.val()) {
                    let chatArr = snap.val();
                    chatArr.push(message)
                    firebase.database().ref('/chat/').set(chatArr)
                } else {
                    let chatArr = []
                    chatArr.push(message);
                    firebase.database().ref('/chat/').set(chatArr)
                }
            })
        }
    }

    static getChat(uid) {
        return dispatch => {
            firebase.database().ref('/chat').on('value', snap => {
                let chatArr = [];
                if (snap.val()) {
                    snap.val().map(v => {
                        var chatDetails = {}
                        if (v.senderUid === uid) {
                            chatDetails.chat = v
                            firebase.database().ref(`/user/${v.receiverUid}`).once('value', snap => {
                                chatDetails.chatWith = snap.val()
                            })
                            chatArr.unshift(chatDetails)
                        } else if (v.receiverUid === uid) {
                            chatDetails.chat = v
                            firebase.database().ref(`/user/${v.senderUid}`).once('value', snap => {
                                chatDetails.chatWith = snap.val()
                            })
                            chatArr.unshift(chatDetails)
                        }
                    })
                }
                dispatch(ChatAction.getChat(chatArr))
            })
        }
    }
}