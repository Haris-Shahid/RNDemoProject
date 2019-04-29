import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Keyboard, Animated } from 'react-native'
import { Container, Content, Input, Item, Header, Left, Body, Icon, Right } from 'native-base';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';
import { Ionicons } from '@expo/vector-icons';
import {styles} from './style';
import { connect } from "react-redux";
import { MessageMiddleware } from '../../Store/Middlewares';

// const { width, height } = Dimensions.get('window')

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            name: '',
            uid: '',
            profileImage: ''
        }
    }

    updateSize(height) {
        if (height < 100) {
            this.setState({ height, })
        }
    }
    
componentWillMount(){
    if(this.props.navigation.getParam("chatUser")){
        let chatUser = this.props.navigation.getParam("chatUser");
        this.setState({
            name: chatUser.name,
            uid: chatUser.uid,
            profileImage: chatUser.profileImage,
            mobToken: chatUser.mobToken
        })
    }
}

    formSubmit() {
        let message = {
            receiverUid: this.state.uid,
            senderUid: this.props.uid,
            message: this.state.message,
            timeStamp: new Date()
        }
        this.props.handleMessages(message, this.props.name, this.state.mobToken)
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <Header style={{ backgroundColor: "#bb0a1e" }} >
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Icon name='ios-arrow-back' style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flexDirection: 'row' }} >
                        <View style={styles.profileIconCont} >
                            {
                                this.state.profileImage == '' || !this.state.profileImage ?
                                    <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                    <Image source={{ uri: this.state.profileImage }} style={styles.profileImage} />
                            }
                        </View>
                        <Text style={styles.title}>{this.state.name}</Text>
                    </Body>
                    <Right>
                        <TouchableOpacity>
                            <Icon name='md-more' style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.inputMainContainer} >
                    <View style={styles.inputContainer} >
                        <View style={{ flex: 4, }} >
                            <TextInput selectionColor='#bb0a1e' onSubmitEditing={() => this.formSubmit()} returnKeyType="send" placeholder='Type a message' placeholderTextColor='rgba(0, 0, 0, 0.5)' style={[styles.inputField, { height: this.state.height }]} onChangeText={message => this.setState({ message })} multiline={true} onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)} />
                        </View>
                        <TouchableOpacity style={styles.cameraIconCont}>
                            <Icon name='md-camera' />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.formSubmit()} style={[styles.sendIconCont, { backgroundColor: this.state.message || this.state.message !== '' ? '#bb0a1e' : 'rgba(0,0,0,0.6)' }]} >
                        <Icon name='md-send' style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollViewCont} >
                    <View style={styles.message} >
                            <Text style={styles.messageTxt} >Hello World</Text>
                            <Text style={{color: '#fff', fontSize: moderateScale(13), position: 'absolute', right: 10, bottom: 10}} >3 : 45 PM</Text>
                    </View>
                    <View style={{ maxWidth: '70%', backgroundColor: 'blue', marginVertical: verticalScale(10), borderRadius: scale(10), padding: moderateScale(10) }} >
                            <Text style={{color: '#fff', fontSize: moderateScale(18)}} >Hello World how are you all ? here is something new</Text>
                            <Text style={{color: '#fff', fontSize: moderateScale(13), textAlign: 'right', marginTop: verticalScale(5) }} >3 : 45 PM</Text>
                    </View>
                    <View style={[styles.message, styles.rightTxt]} >
                            <Text style={{color: '#fff', fontSize: moderateScale(18)}} >Hello World how are you all ? here is something new</Text>
                            <Text style={{color: '#fff', fontSize: moderateScale(13), textAlign: 'right'}} >3 : 45 PM</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileImage: state.AuthReducer.profileImage,
        name: state.AuthReducer.name,
        uid: state.AuthReducer.uid,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleMessages: (message, name, token) => dispatch(MessageMiddleware.handleMessages(message, name, token)),
        getNotification: (uid) => dispatch(PushNotificationMiddleware.getNotification(uid)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
