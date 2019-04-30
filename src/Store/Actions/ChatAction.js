import { GET_CHAT } from '../constant';

export default class ChatAction {
    static getChat(chat) {
        return {
            type: GET_CHAT,
            chat
        }
    }
}