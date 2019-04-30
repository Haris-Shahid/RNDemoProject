import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    profileIconCont: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(50),
        height: verticalScale(50),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(25)
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    noteTxt: {
        textAlign: 'center',
        marginVertical: verticalScale(20),
        marginHorizontal: scale(10)
    }
})