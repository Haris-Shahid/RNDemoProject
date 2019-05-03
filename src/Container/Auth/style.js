import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor: '#000',
        fontSize: scale(25),
        paddingHorizontal: scale(5),
        borderRadius: 50,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        right: scale(4)
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: verticalScale(20),
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
        color: '#000',
        fontSize: moderateScale(20),
        marginLeft: scale(10)
    },
    btn: {
        backgroundColor: '#ec2024',
        width: '90%',
        marginVertical: verticalScale(10),
        alignSelf: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: moderateScale(17),
        fontWeight: 'bold'
    },
    orTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    signUpText: {
        flexDirection: 'row',
    },
    signUp: {
        color: '#000',
        marginLeft: scale(5),
        fontSize: moderateScale(16)
    },
    signUpText1: {
         color: '#000' ,
         fontSize: moderateScale(16)
    },
    errorTxt: {
        fontSize: moderateScale(17),
        width: '90%',
        textAlign: 'center',
        color: '#ec2024',
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