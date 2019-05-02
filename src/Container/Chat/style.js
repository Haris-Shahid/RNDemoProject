import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: moderateScale(20),
        marginLeft: scale(10)
    },
    profileIconCont: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(30),
        height: verticalScale(30),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(18)
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    inputMainContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginVertical: verticalScale(20)
    },
    inputContainer: {
        borderColor: 'rgba(0,0,0,0.7)',
        width: '80%',
        borderRadius: 20,
        paddingVertical: verticalScale(10),
        paddingLeft: scale(10),
        overflow: 'hidden',
        alignSelf: 'center',
        borderWidth: 1,
        flexDirection: 'row'
    },
    inputField: {
        color: '#bb0a1e',
        fontSize: moderateScale(18),
    },
    // cameraIconCont: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    // },
    sendIconCont: {
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    scrollViewCont: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10)
    },
    message: {
        width: '70%',
        backgroundColor: 'blue',
        marginVertical: verticalScale(10),
        borderRadius: scale(10),
        padding: moderateScale(10)
    },
    messageTxt: {
        color: '#fff',
        fontSize: moderateScale(18)
    },
    rightTxt: {
        alignSelf: 'flex-end',
        backgroundColor: '#bb0a1e'
    },
    timeTxt: {
        color: '#fff',
        fontSize: moderateScale(13),
    },
    timeTxt1: {
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    timeTxt2: {
        textAlign: 'right',
        marginTop: verticalScale(5)
    }
})