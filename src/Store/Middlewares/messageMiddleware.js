import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import DonorActions from '../Actions/DonorActions';
import NotificationAction from '../Actions/NotificationAction';

export default class MessageMiddleware {
    static handleMessages(message, name , token){
        return dispatch => {
            console.log(message, name, token)
            
        }
    }
}