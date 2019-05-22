import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: moderateScale(20)
    },
    locationIconCont: {
        position: 'absolute',
        width: scale(45),
        height: scale(45),
        backgroundColor: '#fff',
        left: width - 70,
        bottom: 20,
        borderRadius: 50,
        shadowColor: '#000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigateBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        position: 'absolute',
        left: 20,
        bottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    locationIcon: {
        fontSize: scale(25),
        color: '#000'
    }
})  