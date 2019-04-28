import { StyleSheet } from 'react-native'
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: moderateScale(20)
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
    logoContainer: {
        height: verticalScale(140),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    detailsCont: {
        width: '80%',
        alignSelf: 'center'
    },
    tabCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(10)
    },
    tab1: {
        color: '#000',
        fontWeight: 'bold',
        flex: 1
    },
    tab2: {
        color: '#000',
        flex: 1.5,
        fontSize: moderateScale(18),
    },
    bloodGroupTxt: {
        color: '#bb0a1e',
        flex: 1,
        fontSize: moderateScale(22)
    },
    donorNameTxt: {
        textAlign: 'center',
        fontSize: moderateScale(25),
        color: '#bb0a1e'
    },
    btn: {
        marginTop: verticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: '#fff',
    }
})