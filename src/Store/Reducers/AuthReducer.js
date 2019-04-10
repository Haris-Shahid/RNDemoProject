import { AUTH_START, REGISTER_SUCCESSFULL, AUTH_FAILED, IMAGE_UPLOADED, IMAGE_UPLOADING, IMAGE_UPLOADING_FAILED, LOGIN_SUCCESSFULL } from '../constant';

const initialState = {
    firstName: '',
    lastName: '',
    profileImage: '',
    email: '',
    password: '',
    genderSelected: 'Male',
    isLoading: false,
    profileImageLoading: false,
    validation: null,
    route: false
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {

        case IMAGE_UPLOADED:
            return state = { ...state, profileImage: action.url, profileImageLoading: false }

        case IMAGE_UPLOADING:
            return state = { ...state, profileImageLoading: true }

        case IMAGE_UPLOADING_FAILED:
            return state = { ...state, profileImageLoading: false }

        case REGISTER_SUCCESSFULL:
            return state = { ...state, ...action.payload, isLoading: false, validation: null, route: true }

        case LOGIN_SUCCESSFULL:
            return state = { ...state, ...action.user, isLoading: false, validation: null, route: true }
            
        case AUTH_FAILED:
            return state = { ...state, isLoading: false, validation: action.error }

        case AUTH_START:
            return state = { ...state, isLoading: true }

        default:
            return state;
    }
}