import React, { Component } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { connect } from "react-redux"
import * as nb from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';
import CustomHeader from '../../Components/header';
import { styles } from './style';
import { PushNotificationMiddleware } from '../../Store/Middlewares';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
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
                    <nb.Content>
                        {
                            this.props.notifications.length !== 0 ?
                                this.props.notifications.map(v => {
                                    return (
                                        <nb.Card key={v.uid} style={styles.mainCardCont} >
                                            <nb.CardItem>
                                                <View style={{ flex: 1 }} >
                                                    <View style={styles.profileIconCont} >
                                                        {
                                                            v.profileImage == '' || !v.profileImage ?
                                                                <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                                                <Image source={{ uri: v.profileImage }} style={styles.profileImage} />
                                                        }
                                                    </View>
                                                </View>
                                                <View style={{ flex: 4 }} >
                                                    <Text style={{ fontWeight: 'bold' }} >{v.name}</Text>
                                                    <nb.Text note >Need Your Blood...</nb.Text>
                                                </View>
                                            </nb.CardItem>
                                            <nb.CardItem>
                                                <nb.Button onPress={() => this.props.navigation.navigate('ChatScreen', { chatUser: v })} style={{ width: '100%', backgroundColor: '#bb0a1e' }} block rounded >
                                                    <Ionicons name='ios-chatbubbles' color='#fff' style={{ fontSize: moderateScale(25) }} />
                                                    <Text style={{ color: '#fff', marginLeft: 15 }} >Contact Him</Text>
                                                </nb.Button>
                                            </nb.CardItem>
                                            <nb.CardItem>
                                                <nb.Button style={styles.cBtn} onPress={() => this.props.cancelNotification(v, this.props.uid, this.props.notifications)} >
                                                    <Text style={{ color: '#bb0a1e' }} >Cancel</Text>
                                                </nb.Button>
                                                <nb.Button onPress={() => this.props.handleAcceptNotification(v, this.props.uid)} style={styles.aBtn} >
                                                    <Text style={{ color: '#fff' }} >Accept</Text>
                                                </nb.Button>
                                            </nb.CardItem>
                                        </nb.Card>
                                    )
                                }) :
                                <nb.Text style={{ textAlign: 'center', marginVertical: verticalScale(20), marginHorizontal: scale(10) }} note >There is no notification yet.</nb.Text>
                        }
                    </nb.Content>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.DonorReducer.isLoading,
        userList: state.DonorReducer.userList,
        profileImage: state.AuthReducer.profileImage,
        name: state.AuthReducer.name,
        uid: state.AuthReducer.uid,
        notifications: state.notificationReducer.notifications,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotification: (uid) => dispatch(PushNotificationMiddleware.getNotification(uid)),
        cancelNotification: (d, uid, notification) => dispatch(PushNotificationMiddleware.cancelNotification(d, uid, notification)),
        handleAcceptNotification: (v, uid) => dispatch(PushNotificationMiddleware.handleAcceptNotification(v, uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);