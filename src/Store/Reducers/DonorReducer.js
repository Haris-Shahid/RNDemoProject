import { GET_ALL_DONORS, IS_LOADING_USER, DONOR_FORM_SUBMIT, REQUEST_SEND, EMPTY_DONOR_LIST } from '../constant';

const initialState = {
    userList: [],
    isLoading: false,
    contact: '',
    group: '',
    gender: 'Male',
    city: '',
    address: '',
    bloodDonor: false,
    donorsRequestList: []
}

export default function DonorReducer(state = initialState, action) {
    switch (action.type) {

        case IS_LOADING_USER:
            return state = { ...state, isLoading: true }

        case GET_ALL_DONORS:
            return state = { ...state, userList: action.userList, isLoading: false }

        case DONOR_FORM_SUBMIT:
            return state = { ...state, ...action.formData, isLoading: false }

        case REQUEST_SEND:
            return state = { ...state, isLoading: false }

        case EMPTY_DONOR_LIST:
            return state = { ...state, donorsRequestList: [] }

        default:
            return state;
    }
}