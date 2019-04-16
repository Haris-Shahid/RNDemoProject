import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    inputCont: {
        borderBottomColor: 'rgba(0,0,0,0.5)',
    },
    inputField: {
        color: '#000',
        fontSize: moderateScale(20),
        marginLeft: scale(10)
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
    addIconCont: {
        position: 'absolute',
        width: verticalScale(25),
        height: verticalScale(25),
        backgroundColor: '#bb0a1e',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        bottom: 0,
        right: moderateScale(4)
    },
    addIcon: {
        color: '#fff',
        fontSize: moderateScale(20),
    },
    radioBtn: {
        color: '#bb0a1e',
        fontSize: moderateScale(25)
    },
    radioTxt: {
        color: '#000',
        fontSize: moderateScale(18),
        marginLeft: scale(5)
    },
    radioBtnCont: {
        height: verticalScale(30),
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: scale(10),
    },
    radioBtnChildCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    form: {
        borderWidth: 1,
        width: '70%',
        borderRadius: scale(10),
        borderColor: '#bb0a1e'
    },
    btn: {
        width: "50%",
        alignSelf: "center",
        backgroundColor: '#bb0a1e',
        justifyContent: 'center',
        marginBottom: verticalScale(15)
    },
    btnTxt: {
        color: '#fff'
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    }
})