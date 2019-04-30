import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS, EMPTY_NOTIFICATION } from '../constant';

const initialState = {
    notifications: [],
}

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {

        case GET_NOTIFICATIONS:
            return state = { ...state, notifications: action.notifications }

        case UPDATE_NOTIFICATIONS:
            return state = { ...state, notifications: action.notifications }

        case EMPTY_NOTIFICATION:
            return state = { ...state, notifications: [] }

        default:
            return state;
    }
}