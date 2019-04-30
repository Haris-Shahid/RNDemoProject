import { GET_CHAT } from '../constant';

const initialState = {
    chat: [],
}

export default function ChatReducer(state = initialState, action) {
    switch (action.type) {

        case GET_CHAT:
            return state = { ...state, chat: action.chat }

        default:
            return state;
    }
}