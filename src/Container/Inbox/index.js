import React, { Component } from 'react';
import { View, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux"
import { Header, Left, Right, Icon, Body, List, ListItem, Thumbnail, Content, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';
import CustomHeader from '../../Components/header';
import moment from "moment";
import { styles } from './styles';

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
        let data = this.getUnique(chat);
        data.map(v => {
            let chat = {
                user: v.chatWith
            }
            chatwith.push(chat)
        })
        this.setState({
            chatWith: chatwith
        })
    }

    getUnique(arr) {
        const unique = arr.map(e => e.chatWith.uid)
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
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
                                    // let time = v.message[0].timeStamp
                                    return (
                                        <ListItem onPress={() => this.props.navigation.navigate('ChatScreen', { chatUser: v.user })} key={i} avatar>
                                            <Left>
                                                <View style={styles.profileIconCont} >
                                                    {
                                                        v.user.profileImage == '' || !v.user.profileImage ?
                                                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                                            <Image source={{ uri: v.user.profileImage }} style={styles.profileImage} />
                                                    }
                                                </View>
                                            </Left>
                                            <Body>
                                                <Text>{v.user.name}</Text>
                                                {/* <Text note>{v.message[0].message}</Text> */}
                                            </Body>
                                            <Right>
                                                {/* <Text note>{moment(time).format('hh:mm A')}</Text> */}
                                            </Right>
                                        </ListItem>
                                    )
                                }) :
                                <Text style={styles.noteTxt} note >There is no message yet.</Text>
                        }
                    </List>
                </Content>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chat: state.ChatReducer.chat,
        profileImage: state.AuthReducer.profileImage,
    };
}

export default connect(mapStateToProps, {})(Inbox);