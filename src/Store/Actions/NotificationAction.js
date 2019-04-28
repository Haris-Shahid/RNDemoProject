import { GET_NOTIFICATIONS, EMPTY_NOTIFICATION, UPDATE_NOTIFICATIONS } from '../constant';

export default class NotificationAction {
    static getNotification(notifications){
        return {
            type: GET_NOTIFICATIONS,
            notifications
        }
    }
    static emptyNotification(){
        return{
            type: EMPTY_NOTIFICATION,
        }
    }
    static updateNotification(notificationArray){
        return{
            type: UPDATE_NOTIFICATIONS,
            notifications: notificationArray
        }
    }
}