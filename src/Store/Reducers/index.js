import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DonorReducer from './DonorReducer';
import notificationReducer from './NotificationReducer';
import ChatReducer  from './ChatReducer';

const RootReducer = combineReducers({
    AuthReducer,
    DonorReducer,
    notificationReducer,
    ChatReducer
});

export default RootReducer;