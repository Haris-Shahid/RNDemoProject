import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Image, Platform, Dimensions, KeyboardAvoidingView, Keyboard, Animated } from 'react-native'
import { Container, Content, Input, Item, Header, Left, Body, Icon, Right } from 'native-base';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { connect } from "react-redux";
import { MessageMiddleware } from '../../Store/Middlewares';
import moment from "moment";

// const { width, height } = Dimensions.get('window')

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            name: '',
            uid: '',
            profileImage: '',
            messages: []
        }
    }

    updateSize(height) {
        if (height < 100) {
            this.setState({ height, })
        }
    }

    componentWillMount() {
        if (this.props.navigation.getParam("chatUser")) {
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
            timeStamp: new Date().getTime()
        }
        this.props.handleMessages(message, this.props.name, this.state.mobToken)
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <Header style={{ backgroundColor: "#bb0a1e", paddingBottom: Platform.OS === 'android' ? 0 : verticalScale(15) }} >
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
                    <Right><View /></Right>
                </Header>
                <View style={styles.inputMainContainer} >
                    <View style={styles.inputContainer} >
                        <View style={{ flex: 1, }} >
                            <TextInput value={this.state.message} selectionColor='#bb0a1e' onSubmitEditing={() => this.formSubmit()} returnKeyType="send" placeholder='Type a message' placeholderTextColor='rgba(0, 0, 0, 0.5)' style={[styles.inputField, { height: this.state.height }]} onChangeText={message => this.setState({ message })} multiline={true} onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)} />
                        </View>
                        {/* <TouchableOpacity style={styles.cameraIconCont}>
                            <Icon name='md-camera' />
                        </TouchableOpacity> */}
                    </View>
                    <TouchableOpacity onPress={() => this.formSubmit()} style={[styles.sendIconCont, { backgroundColor: this.state.message || this.state.message !== '' ? '#bb0a1e' : 'rgba(0,0,0,0.6)' }]} >
                        <Icon name='md-send' style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollViewCont} >
                    {
                        this.props.messages.map((v, i) => {
                            if (v.chat.senderUid === this.props.uid && v.chat.receiverUid === this.state.uid) {
                                let messageStyle = v.chat.message.length < 16 ? styles.timeTxt1 : styles.timeTxt2
                                return (
                                    <View key={i} style={[styles.message, styles.rightTxt]} >
                                        <Text style={styles.messageTxt} >{v.chat.message}</Text>
                                        <Text style={[styles.timeTxt, messageStyle]} >{moment(v.chat.timeStamp).format('hh:mm A')}</Text>
                                    </View>
                                )
                            } else if (v.chat.senderUid === this.state.uid && v.chat.receiverUid === this.props.uid) {
                                let messageStyle = v.chat.message.length < 16 ? styles.timeTxt1 : styles.timeTxt2
                                return (
                                    <View key={i} style={styles.message} >
                                        <Text style={styles.messageTxt} >{v.chat.message}</Text>
                                        <Text style={[styles.timeTxt, messageStyle]} >{moment(v.chat.timeStamp).format('hh:mm A')}</Text>
                                    </View>
                                )
                            }
                        })
                    }
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
        messages: state.ChatReducer.chat
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleMessages: (message, name, token) => dispatch(MessageMiddleware.handleMessages(message, name, token)),
        getNotification: (uid) => dispatch(PushNotificationMiddleware.getNotification(uid)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
