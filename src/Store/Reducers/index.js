import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DonorReducer from './DonorReducer';

const RootReducer = combineReducers({
    AuthReducer,
    DonorReducer
});

export default RootReducer;