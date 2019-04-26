import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { scale } from '../Constants/scalingFunction';

const Loader = () => {
    return (
        <View style={styles.mainContainer} >
            <ActivityIndicator animating={true} size='large' color="#bb0a1e" />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loader;
