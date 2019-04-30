import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

const { height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    formCont: {
        width: '90%',
        alignSelf: 'center',
        height: height - verticalScale(70)
    },
    formTitle: {
        fontSize: moderateScale(20),
        marginVertical: verticalScale(15)
    },
    form: {
        borderWidth: 1,
        borderColor: '#bb0a1e',
        borderRadius: scale(10)
    },
    mainCardCont: {
        height: height - verticalScale(200)
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
    acBtnCont: {
        flex: 1.2,
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
        fontSize: 10,
    }
})
