import React, { Component } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux"
import { Icon, Card, CardItem, Content } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';
import CustomHeader from "../../Components/header";
import { styles } from './style';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name='md-person' style={{ color: tintColor, fontSize: 24 }} />
        )
    }

    render() {
        const user = this.props.userDetail;
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <CustomHeader name='Your Profile' profileImage={user.profileImage} menuIcon={() => this.props.navigation.openDrawer()} />
               <Content>
               <Card style={styles.cardCont} >
                    <CardItem>
                        <View style={styles.logoContainer} >
                            <View style={styles.profileIconCont} >
                                {
                                    user.profileImage === "" ?
                                        <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                                }
                            </View>
                        </View>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 0.5 }} ><Text style={styles.headTxt} >Name:</Text></View>
                        <View style={{ flex: 1 }} ><Text style={[styles.bodyTxt]} >{user.name}</Text></View>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 0.5 }} ><Text style={styles.headTxt} >Blood Group:</Text></View>
                        <View style={{ flex: 1 }} ><Text style={[styles.bodyTxt, { color: '#bb0a1e', textAlign: user.group ? 'left' : 'center' }]} >{user.group ? user.group : '-'}</Text></View>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 0.5 }} ><Text style={styles.headTxt} >Email:</Text></View>
                        <View style={{ flex: 1 }} ><Text style={[styles.bodyTxt, { textAlign: user.email ? 'left' : 'center' }]} >{user.email ? user.email : '-'}</Text></View>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 0.5 }} ><Text style={styles.headTxt} >Contact:</Text></View>
                        <View style={{ flex: 1 }} ><Text style={[styles.bodyTxt, { textAlign: user.contact ? 'left' : 'center' }]} >{user.contact ? user.contact : '-'}</Text></View>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 0.5 }} ><Text style={styles.headTxt} >Gender:</Text></View>
                        <View style={{ flex: 1 }} ><Text style={[styles.bodyTxt, { textAlign: user.gender ? 'left' : 'center' }]} >{user.gender ? user.gender : '-'}</Text></View>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 0.5 }} ><Text style={styles.headTxt} >Address:</Text></View>
                        <View style={{ flex: 1 }} ><Text style={[styles.bodyTxt, { textAlign: user.address ? 'left' : 'center' }]} >{user.address ? user.address : '-'}</Text></View>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 0.5 }} ><Text style={styles.headTxt} >City:</Text></View>
                        <View style={{ flex: 1 }} ><Text style={[styles.bodyTxt, { textAlign: user.city ? 'left' : 'center' }]} >{user.city ? user.city : '-'}</Text></View>
                    </CardItem>
                </Card>
               </Content>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileImage: state.AuthReducer.profileImage,
        name: state.AuthReducer.name,
        email: state.AuthReducer.email,
        uid: state.AuthReducer.uid,
        userDetail: state.AuthReducer.userDetail
    };
}

export default connect(mapStateToProps, {})(Profile);