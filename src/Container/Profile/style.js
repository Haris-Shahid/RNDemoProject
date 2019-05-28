import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
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
    cardCont: {
        width: '90%',
        alignSelf: 'center',
        marginTop: verticalScale(20)
    },
    headTxt: {
        fontWeight: 'bold',
        fontSize: moderateScale(18)
    },
    bodyTxt: {
        fontSize: moderateScale(17),
        color: '#909090'
    },
    reviewsCont: {
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        marginVertical: verticalScale(10)
    },
    reviewCount: {
        fontSize: moderateScale(16),
        fontWeight: 'bold'
    },
    seeReview: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#bb0a1e'
    },
    starCont: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    starIcon: {
        color: '#fe9605',
        fontSize: moderateScale(16)
    },
    starTxt: {
        color: '#fe9605',
        fontSize: moderateScale(16),
        marginHorizontal: scale(5)
    }
}) 