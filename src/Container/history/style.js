import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    mainCont: {
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
})