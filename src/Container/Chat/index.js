import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, StatusBar, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Keyboard, Animated } from 'react-native'
import { Container, Content, Input, Item, Header, Left, Body, Icon, Right } from 'native-base';
import { verticalScale, moderateScale, scale } from '../../Constants/scalingFunction';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: null,
            message: '',
        }
    }

    updateSize(height) {
        if (height < 100) {
            this.setState({ height, })
        }
    }

    formSubmit() {

    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <Header style={{ backgroundColor: "#bb0a1e" }} >
                    <Left>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} >
                            <Icon name='ios-arrow-back' style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flexDirection: 'row' }} >
                        <View style={styles.profileIconCont} >
                            {
                                this.props.profileImage == '' || !this.props.profileImage ?
                                    <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                    <Image source={{ uri: this.props.profileImage }} style={styles.profileImage} />
                            }
                        </View>
                        <Text style={styles.title}>Donor Details</Text>
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
                    <TouchableOpacity style={[styles.sendIconCont, { backgroundColor: this.state.message || this.state.message !== '' ? '#bb0a1e' : 'rgba(0,0,0,0.6)' }]} >
                        <Icon name='md-send' style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: scale(10), paddingVertical: verticalScale(10) }} >
                    <View style={{ width: '70%', backgroundColor: 'blue', marginVertical: verticalScale(10), borderRadius: scale(10), padding: moderateScale(10) }} >
                            <Text style={{color: '#fff', fontSize: moderateScale(18)}} >Hello World</Text>
                            <Text style={{color: '#fff', fontSize: moderateScale(13), position: 'absolute', right: 10, bottom: 10}} >3 : 45 PM</Text>
                    </View>
                    <View style={{ maxWidth: '70%', backgroundColor: 'blue', marginVertical: verticalScale(10), borderRadius: scale(10), padding: moderateScale(10) }} >
                            <Text style={{color: '#fff', fontSize: moderateScale(18)}} >Hello World how are you all ? here is something new</Text>
                            <Text style={{color: '#fff', fontSize: moderateScale(13), textAlign: 'right', marginTop: verticalScale(5) }} >3 : 45 PM</Text>
                    </View>
                    <View style={{ maxWidth: '70%', backgroundColor: '#bb0a1e', marginVertical: verticalScale(10), borderRadius: scale(10), padding: moderateScale(10), alignSelf: 'flex-end' }} >
                            <Text style={{color: '#fff', fontSize: moderateScale(18)}} >Hello World how are you all ? here is something new</Text>
                            <Text style={{color: '#fff', fontSize: moderateScale(13), textAlign: 'right'}} >3 : 45 PM</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: moderateScale(20),
        marginLeft: scale(10)
    },
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
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    inputMainContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginVertical: verticalScale(20)
    },
    inputContainer: {
        borderColor: 'rgba(0,0,0,0.7)',
        width: '85%',
        borderRadius: 20,
        paddingVertical: verticalScale(10),
        paddingLeft: scale(10),
        overflow: 'hidden',
        alignSelf: 'center',
        borderWidth: 1,
        flexDirection: 'row'
    },
    inputField: {
        color: '#bb0a1e',
        fontSize: moderateScale(18),
    },
    cameraIconCont: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sendIconCont: {
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatScreen;
