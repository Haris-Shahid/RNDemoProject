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
        flex: 1,
        opacity: 0.5,
    },
    childContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    logoContainer: {
        height: verticalScale(150),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileIconCont: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(100),
        height: verticalScale(100),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.5)',
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
        color: '#bb0a1e',
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
        paddingVertical: verticalScale(30),
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: scale(10)
    },
    inputCont: {
        width: '90%',
        marginVertical: verticalScale(10),
        borderBottomColor: 'rgba(0,0,0,0.5)',
    },
    inputIcon: {
        color: '#000',
        fontSize: moderateScale(25),
    },
    inputField: {
        color: '#fff',
        fontSize: moderateScale(20),
        marginLeft: scale(10)
    },
    btn: {
        backgroundColor: '#bb0a1e',
        width: '90%',
        marginVertical: verticalScale(20),
        alignSelf: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: moderateScale(17),
        fontWeight: 'bold'
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
        fontSize: moderateScale(17),
        width: '90%',
        textAlign: 'center',
        color: '#bb0a1e',
        marginTop: verticalScale(10)
    },
    fgpasswordTitle: {
        color: '#000',
        fontSize: moderateScale(25),
        textAlign: 'center'
    },
    fgpassInst: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: moderateScale(18),
        marginHorizontal: scale(10),
        textAlign: 'center'
    },
    forgotPCont: {
        width: '90%',
        alignSelf: 'center'
    },
    forgotPText: {
        textAlign: 'right',
        fontSize: moderateScale(18)
    }
})