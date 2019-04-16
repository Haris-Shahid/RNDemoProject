import {
    GET_ALL_DONORS,
    IS_LOADING_USER,
    DONOR_FORM_SUBMIT,
} from '../constant'


export default class DonorActions {
    static getAllDonors(userList) {
        return {
            type: GET_ALL_DONORS,
            userList
        }
    }
    static isLoadingUser() {
        return {
            type: IS_LOADING_USER
        }
    }
    static donorFormSubmit(formData){
        return{
            type: DONOR_FORM_SUBMIT,
            formData
        }
    }
}