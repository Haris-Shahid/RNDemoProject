import React from 'react';
import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';


export const styles = StyleSheet.create({
    profileIconCont: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(40),
        height: verticalScale(40),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(20)
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    mainCardCont: {
        width: '90%',
        alignSelf: 'center'
    },
    cBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#bb0a1e',
        backgroundColor: 'transparent',
        borderTopLeftRadius: scale(10),
        borderBottomLeftRadius: scale(10)
    },
    aBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb0a1e',
        borderTopRightRadius: scale(10),
        borderBottomRightRadius: scale(10)
    },
    chatIconCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})