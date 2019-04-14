import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import { verticalScale, scale, moderateScale } from '../Constants/scalingFunction';
import { Ionicons } from '@expo/vector-icons';

export default CustomModal = ({ visible, handleModal }) => (
    <Modal style={styles.modalCont} isVisible={visible}>
        <View style={styles.modal}>
            <Ionicons name="md-checkmark-circle-outline" style={styles.successIcon} />
            <Text style={styles.modalTitle} >Registration Completed Successfully</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => handleModal()}>
                <Text style={{ color: '#fff', fontSize: 20, }} >OK</Text>
            </TouchableOpacity>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    modalCont: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: Dimensions.get('window').width - scale(50),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(10)
    },
    successIcon: {
        fontSize: moderateScale(50),
        color: '#63d15d',
        marginTop: verticalScale(20)
    },
    modalTitle: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: verticalScale(10)
    },
    modalBtn: {
        backgroundColor: '#bb0a1e',
        width: '50%',
        alignSelf: 'center',
        marginBottom: verticalScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        borderRadius: scale(5)
    }
})