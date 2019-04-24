import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DonorReducer from './DonorReducer';
import notificationReducer from './NotificationReducer';

const RootReducer = combineReducers({
    AuthReducer,
    DonorReducer,
    notificationReducer
});

export default RootReducer;