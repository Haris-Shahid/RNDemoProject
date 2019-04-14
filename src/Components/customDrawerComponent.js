import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../Constants/scalingFunction';
import { AuthMiddleware } from '../Store/Middlewares';

class CustomDrawerComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <View style={styles.userProfileCont} >
                    <View style={styles.profileIconCont} >
                    {
                        this.props.profileImage == '' || !this.props.profileImage ? 
                        <Ionicons name='ios-person' style={styles.profileIcon} /> :
                        <Image source={{ uri: this.props.profileImage }} style={{ width: '100%', height: '100%' }} />
                    }
                    </View>
                    <Text style={styles.userName} >{this.props.name}</Text>
                </View>
                <ScrollView>
                    <DrawerItems {...this.props} />
                    <View style={styles.logoutCont} >
                        <TouchableOpacity onPress={() => this.props.signOut(this.props.navigation)} style={styles.logoutBtn} >
                            <Text style={styles.logoutTxt} >Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.AuthReducer.isLoading,
        name: state.AuthReducer.name,
        profileImage: state.AuthReducer.profileImage,
        validation: state.AuthReducer.validation,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (nav) => { dispatch(AuthMiddleware.SignOutMiddleware(nav)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerComponent);

const styles = StyleSheet.create({
    userProfileCont: {
        height: verticalScale(120),
        alignItems: 'center',
        backgroundColor: '#bb0a1e',
        paddingHorizontal: scale(20),
        flexDirection: 'row',
    },
    profileIconCont: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(70),
        height: verticalScale(70),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: moderateScale(40)
    },
    userName: {
        color: '#fff',
        fontSize: moderateScale(20),
        marginLeft: scale(20),
    },
    logoutCont: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.5)'
    },
    logoutBtn: {
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10)
    },
    logoutTxt: {
        fontSize: moderateScale(18),
        color: '#bb0a1e'
    }
})

