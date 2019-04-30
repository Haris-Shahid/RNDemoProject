import React, { Component } from 'react';
import { View, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux"
import { Header, Left, Right, Icon, Body, List, ListItem, Thumbnail, Content, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';
import CustomHeader from '../../Components/header';

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatWith: []
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name='md-mail' style={{ color: tintColor, fontSize: 22 }} />
        )
    }

    componentWillMount() {
        this.handleChat(this.props.chat)
    }

    handleChat(chat) {
        let chatwith = [];
        chat.map(v => {
            if (chatwith.length === 0) {
                let chat = {
                    chatWith: v.chatWith,
                    message: [v.chat]
                }
                chatwith.push(chat)
            } else {
                chatwith.forEach(e => {
                    if (e.chatWith.uid === v.chatWith.uid) {
                        e.message.push(v.chat)
                    } else {
                        let chat = {
                            chatWith: v.chatWith,
                            message: [v.chat]
                        }
                        chatwith.push(chat)
                    }
                })
            }
        })
        this.setState({
            chatWith: chatwith
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chat) {
            this.handleChat(nextProps.chat)
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <CustomHeader name='Inbox' profileImage={this.props.profileImage} menuIcon={() => this.props.navigation.openDrawer()} />
                <Content>
                    <List>
                        {
                            this.state.chatWith.length !== 0 ? 
                            this.state.chatWith.map((v, i) => {
                                let time = Number(v.message[0].timeStamp)
                                time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                console.log(time )
                                return (
                                    <TouchableOpacity key={i} >
                                        <ListItem avatar>
                                            <Left>
                                                <View style={styles.profileIconCont} >
                                                    {
                                                        v.chatWithprofileImage == '' || !v.chatWith.profileImage ?
                                                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                                            <Image source={{ uri: v.chatWith.profileImage }} style={styles.profileImage} />
                                                    }
                                                </View>
                                            </Left>
                                            <Body>
                                                <Text>{v.chatWith.name}</Text>
                                                <Text note>{v.message[0].message}</Text>
                                            </Body>
                                            <Right>
                                                <Text note>{time}</Text>
                                            </Right>
                                        </ListItem>
                                    </TouchableOpacity>
                                )
                            }) : 
                            <Text style={{ textAlign: 'center', marginVertical: verticalScale(20), marginHorizontal: scale(10) }} note >There is no message yet.</Text>
                        }
                    </List>
                </Content>
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
        width: verticalScale(50),
        height: verticalScale(50),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(25)
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
})

const mapStateToProps = (state) => {
    return {
        chat: state.ChatReducer.chat,
        profileImage: state.AuthReducer.profileImage,
    };
}

export default connect(mapStateToProps, {})(Inbox);