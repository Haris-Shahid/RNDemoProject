import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {scale} from '../Constants/scalingFunction';

const Loader = () => {
    return (
        <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator animating={true} size={scale(50)} color="#bb0a1e" />
        </View>
    )
}

export default Loader;
