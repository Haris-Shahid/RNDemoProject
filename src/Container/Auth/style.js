import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    bgImage: {
        width: null,
        height: null,
        flex: 1
    },
    childContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    logoContainer: {
        height: verticalScale(170),
        width: '100%',
        justifyContent: 'center',
        paddingTop: verticalScale(50),
        alignItems: 'center'
    },
    profileIconCont: {
        backgroundColor: '#4c4c4c',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(100),
        height: verticalScale(100),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: moderateScale(50)
    },
    profileIconAdd: {
        color: '#fff',
        fontSize: moderateScale(25),
        position: 'absolute',
        bottom: 0,
        right: moderateScale(4)
    },
    logoText1: {
        color: '#ff6c2c',
        fontSize: moderateScale(40),
        fontFamily: "rentuck",
    },
    logoText2: {
        color: '#fff',
        fontSize: moderateScale(25),
        fontFamily: "rentuck",
    },
    formContainer: {
        width: '85%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: scale(5),
        paddingVertical: verticalScale(30)
    },
    inputCont: {
        width: '90%',
        marginVertical: verticalScale(10)
    },
    inputIcon: {
        color: '#fff',
        fontSize: moderateScale(25),
    },
    inputField: {
        color: '#fff',
        fontSize: moderateScale(20),
        marginLeft: scale(10)
    },
    btn: {
        backgroundColor: '#ff6c2c',
        marginVertical: verticalScale(20)
    },
    btnTxt: {
        color: '#fff',
        fontSize: moderateScale(17),
        fontWeight: 'bold'
    },
    radioBtn: {
        color: '#ff6c2c',
        fontSize: moderateScale(25)
    },
    radioTxt: {
        color: '#fff',
        fontSize: moderateScale(18),
        marginLeft: scale(5)
    },
    radioBtnCont: {
        width: '100%',
        height: verticalScale(30),
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center'
    },
    radioBtnChildCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    orTxt: {
        height: verticalScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    signUpText: {
        flexDirection: 'row',
        marginTop: verticalScale(10)
    },
    signUp: {
        color: '#fff',
        marginLeft: scale(5)
    },
    errorTxt: {
        fontSize: moderateScale(20), 
        color: '#ff0000', 
        marginTop : verticalScale(10)
    }
})