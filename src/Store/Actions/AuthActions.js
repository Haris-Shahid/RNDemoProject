import {
    IMAGE_UPLOADING,
    IMAGE_UPLOADED,
    IMAGE_UPLOADING_FAILED,
    AUTH_START,
    REGISTER_SUCCESSFULL,
    AUTH_FAILED,
    LOGIN_SUCCESSFULL,
    RESET_ALL_STATE,
    FB_USER_LOGIN,
    FORGET_PASSWORD
} from '../constant'


export default class AuthActions {

    static imageUploading() {
        return {
            type: IMAGE_UPLOADING
        }
    }

    static imageUploaded(url) {
        return {
            type: IMAGE_UPLOADED,
            url
        }
    }

    static imageUploadingFailed() {
        return {
            type: IMAGE_UPLOADING_FAILED
        }
    }

    static authStart() {
        return {
            type: AUTH_START
        }
    }
    static registerSuccessfull(payload) {
        return {
            type: REGISTER_SUCCESSFULL,
            payload
        }
    }
    static authfailed(error) {
        return {
            type: AUTH_FAILED,
            error
        }
    }

    static loginSuccessfully(user) {
        return {
            type: LOGIN_SUCCESSFULL,
            user
        }
    }
    static resetAllState() {
        return {
            type: RESET_ALL_STATE
        }
    }

    static loginSuccessfullyFB(user) {
        return {
            type: FB_USER_LOGIN,
            user
        }
    }
    static fgPasswrod() {
        return {
            type: FORGET_PASSWORD,
        }
    }
}