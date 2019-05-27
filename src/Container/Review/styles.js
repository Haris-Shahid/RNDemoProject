import { StyleSheet, Platform } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    cont: {
        backgroundColor: '#fff',
        flex: 1
    },
    header: {
        backgroundColor: "#bb0a1e",
        paddingBottom: Platform.OS === 'android' ? 0 : verticalScale(15)
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(20)
    },
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
    },
    starCont: {
        width: '70%',
        marginTop: verticalScale(10)
    }
})