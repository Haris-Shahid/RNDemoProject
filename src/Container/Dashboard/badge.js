import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

const Badge = ({ requestSendTo, uid }) => {
    return (
        <View style={styles.acBtnCont}>
            {
                requestSendTo.length !== 0 ?
                    (requestSendTo.map(v => (
                        uid === v.uid && v.pendingStatus === false ?
                            <TouchableOpacity key={v.uid} style={[styles.btn, { backgroundColor: '#f1c232' }]} >
                                <Text style={[styles.btnTxt]} >PENDING</Text>
                            </TouchableOpacity> :
                            uid === v.uid && v.pendingStatus === true ?
                                <TouchableOpacity key={v.uid} style={[styles.btn, { backgroundColor: '#5bb85d' }]} >
                                    <Text style={styles.btnTxt} >ACCEPTED</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity key={v.uid} style={styles.btn} >
                                    <Text style={styles.btnTxt} >REQUEST</Text>
                                </TouchableOpacity>
                    ))) :
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btnTxt} >REQUEST</Text>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default Badge;