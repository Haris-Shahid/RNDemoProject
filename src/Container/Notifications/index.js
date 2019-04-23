import React, { Component } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from "react-redux"
import * as nb from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';
import CustomHeader from '../../Components/header';

const { height } = Dimensions.get('window')
class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',

        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <nb.Icon name='md-notifications' style={{ color: tintColor, fontSize: 24 }} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <CustomHeader name='Notifications' profileImage={this.props.profileImage} menuIcon={() => this.props.navigation.openDrawer()} />
                <View style={{ flex: 1 }} >
                    <nb.Card style={styles.mainCardCont} >
                        <nb.CardItem>
                            <View style={{ flex: 1 }} >
                                <View style={styles.profileIconCont} >
                                    {
                                        this.props.profileImage == '' || !this.props.profileImage ?
                                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                            <Image source={{ uri: this.props.profileImage }} style={styles.profileImage} />
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 3.5 }} >
                                <Text style={{ fontWeight: 'bold' }} >Harisb</Text>
                                <Text>hhhhhhhhhhhhh</Text>
                            </View>
                            <TouchableOpacity style={styles.chatIconCont} >
                                <Ionicons name='ios-chatbubbles' color='#bb0a1e' style={{ fontSize: moderateScale(25) }} />
                            </TouchableOpacity>
                        </nb.CardItem>
                        <nb.CardItem>
                            <nb.Button style={styles.cBtn} >
                                <Text style={{ color: '#bb0a1e' }} >Cancel</Text>
                            </nb.Button>
                            <nb.Button style={styles.aBtn} >
                                <Text style={{ color: '#fff' }} >Accept</Text>
                            </nb.Button>
                        </nb.CardItem>
                    </nb.Card>
                    <nb.Card style={styles.mainCardCont} >
                        <nb.CardItem>
                            <View style={{ flex: 1 }} >
                                <View style={styles.profileIconCont} >
                                    {
                                        this.props.profileImage == '' || !this.props.profileImage ?
                                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                            <Image source={{ uri: this.props.profileImage }} style={styles.profileImage} />
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 3.5 }} >
                                <Text style={{ fontWeight: 'bold' }} >Harisb</Text>
                                <Text>hhhhhhhhhhhhh</Text>
                            </View>
                            <TouchableOpacity style={styles.chatIconCont} >
                                <Ionicons name='ios-chatbubbles' color='#bb0a1e' style={{ fontSize: moderateScale(25) }} />
                            </TouchableOpacity>
                        </nb.CardItem>
                        <nb.CardItem>
                            <nb.Button style={styles.cBtn} >
                                <Text style={{ color: '#bb0a1e' }} >Cancel</Text>
                            </nb.Button>
                            <nb.Button style={styles.aBtn} >
                                <Text style={{ color: '#fff' }} >Accept</Text>
                            </nb.Button>
                        </nb.CardItem>
                    </nb.Card>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    headerTxt: {
        color: '#fff',
        fontSize: 20
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

const mapStateToProps = (state) => {
    return {
        isLoading: state.DonorReducer.isLoading,
        userList: state.DonorReducer.userList,
        profileImage: state.AuthReducer.profileImage,
        name: state.AuthReducer.name,
        uid: state.AuthReducer.uid,
        rqsendTo: state.AuthReducer.requestSendTo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetDonors: (uid) => dispatch(DonorMiddleware.GetDonors(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);