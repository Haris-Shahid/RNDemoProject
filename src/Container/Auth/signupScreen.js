import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import { Font } from 'expo';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { ImagePicker } from 'expo';
import Loader from '../../Components/activityIndicator';
import * as firebase from 'firebase';

class SignUpScreen extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
            profileImage: null,
            gender: [
                {
                    name: 'Male',
                    status: true
                },
                {
                    name: 'Female',
                    status: false
                }
            ],
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            retypePassword: '',
            genderSelected: 'Male',
            validation: null,
            loading: false,
        }
    }
    static navigationOptions = {
        header: { visible: false }
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
            base64: true
        });
        if (!result.cancelled) {
            this.setState({ profileImage: result.uri })
            let base64Img = `data:image/jpg;base64,${result.base64}`;
            let apiUrl= 'https://api.cloudinary.com/v1_1/doe7h15vw/image/upload';
            let data = {
                "file": base64Img,
                "upload_preset": "erxp1q1m",
              }
              fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'POST',
              }).then(async r => {
                  let data = await r.json()
                  console.log(data.secure_url)
                  return data.secure_url
              }).catch(err=>console.log(err))
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

    handleInput(type, value) {
        this.setState({
            [type]: value
        })
    }

    formSubmit() {
        this.setState({ loading: true })
        const { firstName, lastName, email, password, retypePassword, genderSelected, profileImage } = this.state;
        var validation = `${
            !firstName ? 'Please enter your First Name' :
                !lastName ? 'Please enter your Last Name' :
                    !email ? 'Please enter your email' :
                        email.indexOf('@') == -1 || email.indexOf('.com') == -1 ? 'Please enter valid email id' :
                            !password ? 'Please enter password' :
                                password.length < 8 ? 'Enter password must contain at least 8 characters' :
                                    !retypePassword ? 'Please enter Retype password to confirm your password' :
                                        retypePassword !== password ? "Your password doesn't match" : null}`
        this.setState({ validation, loading: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image source={require('../../../assets/images/bgImage.png')} style={styles.bgImage} />
                <View style={styles.childContainer} >
                    <Content>
                        <View style={styles.logoContainer} >
                            <TouchableOpacity onPress={() => this._pickImage()} >
                                <View style={styles.profileIconCont} >
                                    {
                                        this.state.profileImage === null ?
                                            <Ionicons name='ios-person' style={styles.profileIcon} />
                                            :
                                            <Image source={{ uri: this.state.profileImage }} style={{ width: '100%', height: '100%' }} />
                                    }
                                </View>
                                <Ionicons name='ios-add-circle' style={styles.profileIconAdd} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formContainer} >
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-person' />
                                <Input onChangeText={(text) => this.handleInput('firstName', text)} placeholder='First Name' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-person' />
                                <Input onChangeText={(text) => this.handleInput('lastName', text)} placeholder='Last Name' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-mail' />
                                <Input onChangeText={(text) => this.handleInput('email', text)} placeholder='Email' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input onChangeText={(text) => this.handleInput('password', text)} placeholder='Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input onChangeText={(text) => this.handleInput('retypePassword', text)} placeholder='Retype Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
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
                            {this.state.validation === null && <Text style={styles.errorTxt} >{this.state.validation}</Text>}
                            <Button onPress={() => this.formSubmit()} style={styles.btn} block >
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
                    {this.state.loading && <Loader />}
                </View>
            </View>
        )
    }
}

export default SignUpScreen;