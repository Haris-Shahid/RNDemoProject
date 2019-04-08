import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { ImagePicker } from 'expo';

class SignUpScreen extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
            image: null,
            gender: [
                {
                    name: 'Male',
                    status: true
                },
                {
                    name: 'Female',
                    status: false
                }
            ]
        }
    }
    static navigationOptions = {
        header: { visible:false } 
    }
    async componentDidMount() {
        await Font.loadAsync({
            'rentuck': require('../../../assets/fonts/Rentuck.ttf'),
        });
        this.setState({
            fontLoaded: true
        })
    }

    async _pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }

    handleRadio(g) {
        const { gender } = this.state;
        if (g === "male") {
            gender[0].status = true;
            gender[1].status = false;
            this.setState({ gender })
        } else {
            gender[0].status = false;
            gender[1].status = true;
            this.setState({ gender })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image source={require('../../../assets/images/bgImage.png')} style={styles.bgImage} />
                <View style={styles.childContainer} >
                    <Content>
                        <View style={styles.logoContainer} >
                            {
                                this.state.image === null ?
                                    <TouchableOpacity onPress={() => this._pickImage()} style={styles.profileIconCont} >
                                        <Ionicons name='ios-person' style={styles.profileIcon} />
                                        <Ionicons name='ios-add-circle' style={styles.profileIconAdd} />
                                    </TouchableOpacity> :
                                    <View style={[styles.profileIconCont, { overflow: 'hidden' }]} >
                                        <Image source={{ uri: this.state.image }} style={{ width: '100%', height: '100%' }} />
                                    </View>
                            }
                        </View>
                        <View style={styles.formContainer} >
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-person' />
                                <Input placeholder='First Name' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-person' />
                                <Input placeholder='Last Name' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-mail' />
                                <Input placeholder='Email' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input placeholder='Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input placeholder='Retype Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <View style={styles.radioBtnCont} >
                                <View style={styles.radioBtnChildCont} >
                                    <TouchableOpacity onPress={() => this.handleRadio('male')} >
                                        <Ionicons style={styles.radioBtn} name={this.state.gender[0].status ? "md-radio-button-on" : "md-radio-button-off"} />
                                    </TouchableOpacity>
                                    <Text style={styles.radioTxt} >Male</Text>
                                </View>
                                <View style={styles.radioBtnChildCont} >
                                    <TouchableOpacity onPress={() => this.handleRadio('female')} >
                                        <Ionicons style={styles.radioBtn} name={this.state.gender[1].status ? "md-radio-button-on" : "md-radio-button-off"} />
                                    </TouchableOpacity>
                                    <Text style={styles.radioTxt} >Female</Text>
                                </View>
                            </View>
                            <Button style={styles.btn} block >
                                <Text style={styles.btnTxt} >SIGN UP</Text>
                            </Button>
                            <View style={[styles.orTxt, styles.signUpText]} >
                                <Text style={{ color: '#fff' }} >Already have an Account?</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                    <Text style={styles.signUp} >LOGIN NOW</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Content>
                </View>
            </View>
        )
    }
}

export default SignUpScreen;