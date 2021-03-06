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
        width: verticalScale(35),
        height: verticalScale(35),
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
        borderColor: '#39604c',
        borderRadius: 20,
        paddingVertical: verticalScale(10),
        paddingLeft: scale(10),
        overflow: 'hidden',
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
        height: scale(45),
        width: scale(45),
        borderRadius: 50,
        marginLeft: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewCont: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10)
    },
    message: {
        width: '70%',
        backgroundColor: '#39604c',
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
        backgroundColor: 'rgb(236,32,36)'
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