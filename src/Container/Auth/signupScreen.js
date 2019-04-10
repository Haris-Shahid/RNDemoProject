import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Font } from 'expo';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { connect } from "react-redux"
import Loader from '../../Components/activityIndicator';
import { scale } from '../../Constants/scalingFunction';
import { MainMiddleware } from '../../Store/Middlewares';

class SignUpScreen extends Component {
    static navigationOptions = {
        header: { visible: false }
    }
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
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
    async componentDidMount() {
        await Font.loadAsync({
            'rentuck': require('../../../assets/fonts/Rentuck.ttf'),
        });
        this.setState({
            fontLoaded: true
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            validation: nextProps.validation
        })
       nextProps.route && this.props.navigation.goBack();
    }

    handleRadio(g) {
        const { gender } = this.state;
        if (g === "male") {
            gender[0].status = true;
            gender[1].status = false;
            this.setState({ gender, genderSelected: gender[0].name })
        } else {
            gender[0].status = false;
            gender[1].status = true;
            this.setState({ gender, genderSelected: gender[1].name })
        }
    }

    handleInput(type, value) {
        this.setState({
            [type]: value
        })
    }

    formSubmit() {
        const { firstName, lastName, email, password, retypePassword, genderSelected } = this.state;
        var validation = `${
            !firstName ? 'Please enter your First Name' :
                !lastName ? 'Please enter your Last Name' :
                    !email ? 'Please enter your email' :
                        email.indexOf('@') == -1 || email.indexOf('.com') == -1 ? 'Please enter valid email id' :
                            !password ? 'Please enter password' :
                                password.length < 8 ? 'Enter password must contain at least 8 characters' :
                                    !retypePassword ? 'Please enter Retype password to confirm your password' :
                                        retypePassword !== password ? "Your password doesn't match" : null}`
        if (validation === null || validation === "null") {
            this.setState({ validation: null })
            let UserData = { firstName, lastName, email, password, profileImage: this.props.profileImage, gender: genderSelected }
            this.props.signUp(UserData)
            this.setState({
                validation: null,
            })
        } else {
            this.setState({ validation })
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
                            <TouchableOpacity onPress={() => this.props.UploadImage()} >
                                <View style={styles.profileIconCont} >
                                    {
                                        this.props.profileImageLoading ?
                                            <ActivityIndicator animating={true} size={scale(25)} color="rgba(0,0,0,0.5)" /> :
                                            this.props.profileImage === "" ?
                                                <Ionicons name='ios-person' style={styles.profileIcon} />
                                                :
                                                <Image source={{ uri: this.props.profileImage }} style={{ width: '100%', height: '100%' }} />
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
                            {(this.state.validation !== null || this.state.validation !== 'null') && <Text style={styles.errorTxt} >{this.state.validation}</Text>}
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
                    {this.props.isLoading && <Loader />}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.AuthReducer.isLoading,
        profileImage: state.AuthReducer.profileImage,
        profileImageLoading: state.AuthReducer.profileImageLoading,
        validation: state.AuthReducer.validation,
        route: state.AuthReducer.route,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (data) => { dispatch(MainMiddleware.SignUpMiddleware(data)) },
        UploadImage: (uri) => { dispatch(MainMiddleware.UploadImage(uri)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);