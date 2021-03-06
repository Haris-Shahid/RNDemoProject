import { AUTH_START, REGISTER_SUCCESSFULL, AUTH_FAILED, IMAGE_UPLOADED, IMAGE_UPLOADING, IMAGE_UPLOADING_FAILED, LOGIN_SUCCESSFULL, RESET_ALL_STATE, FB_USER_LOGIN, FORGET_PASSWORD, SIGN_OUT, RECOVER_DATA, USER_DETAIL } from '../constant';

const initialState = {
    name: '',
    profileImage: '',
    email: '',
    isLoading: false,
    profileImageLoading: false,
    validation: null,
    navigateRoute: false,
    userDetail: {}
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {

        case IMAGE_UPLOADING:
            return state = { ...state, profileImageLoading: true }

        case IMAGE_UPLOADED:
            return state = { ...state, profileImage: action.url, profileImageLoading: false }

        case IMAGE_UPLOADING_FAILED:
            return state = { ...state, profileImageLoading: false }

        case REGISTER_SUCCESSFULL:
            return state = { ...state, ...action.payload, isLoading: false, validation: null, navigateRoute: true }

        case LOGIN_SUCCESSFULL:
            return state = { ...state, ...action.user, isLoading: false, validation: null, }

        case AUTH_FAILED:
            return state = { ...state, isLoading: false, validation: action.error, navigateRoute: false }

        case AUTH_START:
            return state = { ...state, isLoading: true }

        case FB_USER_LOGIN:
            return state = { ...state, ...action.user, isLoading: false, validation: null }

        case RESET_ALL_STATE:
            return state = { ...state, isLoading: false, validation: null, profileImageLoading: false, name: '', email: '', profileImage: '', navigateRoute: false }

        case FORGET_PASSWORD:
            return state = { ...state, isLoading: false, validation: null, navigateRoute: true }

        case SIGN_OUT:
            return state = { ...state, isLoading: false, validation: null, navigateRoute: false, name: '', email: '', profileImage: '' }

        case RECOVER_DATA:
            return state = { ...state, isLoading: false, validation: null, navigateRoute: false, name: action.user.name, email: action.user.email, profileImage: action.user.profileImage, uid: action.user.uid }

        case USER_DETAIL:
            return state = { ...state, userDetail: action.user }

        default:
            return state;
    }
}