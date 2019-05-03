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
        fontSize: scale(18),
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
        fontSize: 10,
    }
})
