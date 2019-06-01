import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../Constants/scalingFunction';

export const styles = StyleSheet.create({
    mainCont: {
        flex: 1
    },
    note: {
        textAlign: 'center',
        marginVertical: verticalScale(20),
        marginHorizontal: scale(10)
    },
})