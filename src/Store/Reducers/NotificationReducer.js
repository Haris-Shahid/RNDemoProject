import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from '../constant';

const initialState = {
    notifications: [],
}

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {

        case GET_NOTIFICATIONS:
            return state = { ...state, notifications: action.notifications }
        case UPDATE_NOTIFICATIONS:
            return state = { ...state, notifications: action.notifications }
        default:
            return state;
    }
}