import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

const Badge = ({ donorsRequestList, donorUid }) => {
    var pendingStatus;
    if (donorsRequestList.length !== 0) {
        donorsRequestList.forEach(e => {
            if (e.donorUid === donorUid) {
                if (e.accept) {
                    pendingStatus = true
                } else {
                    pendingStatus = false
                }
            }
        })
    } else {
        pendingStatus = undefined
    }
    return (
        <View style={styles.acBtnCont}>
            <View style={[styles.btn, { backgroundColor: pendingStatus ? '#5bb85d' : pendingStatus === undefined ? '#bb0a1e' : '#f1c232' }]} >
                <Text style={[styles.btnTxt]} >{pendingStatus ? 'ACCEPTED' : pendingStatus === undefined ? 'REQUEST' : 'PENDING'}</Text>
            </View>
        </View>
    )
}

export default Badge;