import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text, Platform } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
import { verticalScale, moderateScale } from '../Constants/scalingFunction';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = (props) => {
    return (
        <Header style={{ backgroundColor: "#bb0a1e", paddingBottom: Platform.OS === 'android' ? 0 : verticalScale(15) }} >
            <Left>
                <TouchableOpacity onPress={() => props.menuIcon()} >
                    <Icon name='md-menu' style={{ color: '#fff' }} />
                </TouchableOpacity>
            </Left>
            <Body>
                <Text style={styles.headerTxt} >{props.name}</Text>
            </Body>
            <Right>
                <TouchableOpacity style={styles.profileIconCont} onPress={() => props.navigate ? props.navigate() : null} >
                    {
                        props.profileImage == '' || !props.profileImage ?
                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                            <Image source={{ uri: props.profileImage }} style={styles.profileImage} />
                    }
                </TouchableOpacity>
            </Right>
        </Header>
    )
}

export default CustomHeader;

const styles = StyleSheet.create({
    profileIconCont: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(30),
        height: verticalScale(30),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(18)
    },
    headerTxt: {
        color: '#fff',
        fontSize: 20
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    }
})