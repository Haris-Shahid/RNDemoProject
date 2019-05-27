import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

const { height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    childCont: {
        width: '95%',
        alignSelf: 'center',
        flex: 1,
    },
    formTitle: {
        fontSize: moderateScale(18),
        marginVertical: verticalScale(15)
    },
    form: {
        borderBottomWidth: 1,
        borderColor: '#bb0a1e',
    },
    mainCardCont: {
        height: '95%'
    },
    scrollCont: {
        flex: 1,
        width: '95%',
        alignSelf: 'center',
        paddingBottom: scale(10)
    },
    profileIconCont: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(40),
        height: verticalScale(40),
        overflow: 'hidden'
    },
    userProfile: {
        borderRadius: 50,
        width: '100%',
        height: '100%'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(25)
    },
    userName: {
        flex: 3,
        height: verticalScale(40),
        justifyContent: 'center'
    },
    userNameTxt: {
        fontSize: moderateScale(16)
    },
    acBtnCont: {
        flex: 1.5,
        height: verticalScale(40),
        justifyContent: 'center'
    },
    btn: {
        height: verticalScale(30),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: moderateScale(10),
    },
    donorIconCont: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(60),
        height: verticalScale(60),
        alignSelf: 'center',
        marginVertical: verticalScale(15),
        overflow: 'hidden'
    },
    donorIcon: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: moderateScale(30)
    },
    donorImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    inputField: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: verticalScale(10),
        color: '#000',
        fontSize: moderateScale(16),
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10)
    },
    modalHead: {
        textAlign: 'center',
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        marginTop: verticalScale(10)
    },
    modalName: {
        textAlign: 'center',
        fontSize: moderateScale(17)
    },
    separater: {
        width: '100%',
        borderBottomColor: '#eee',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: verticalScale(10),
    },
    starTxt: {
        textAlign: 'center',
        fontSize: moderateScale(15),
        color: '#9d9d9d',
        marginBottom: verticalScale(10)
    },
    starCont: {
        width: '70%',
        alignSelf: 'center'
    },
    btn1: {
        marginBottom: verticalScale(10),
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        height: verticalScale(40)
    },
    btn1Txt: {
        color: '#fff',
        fontSize: moderateScale(16)
    }
})
