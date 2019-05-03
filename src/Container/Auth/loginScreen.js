import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Font, Facebook } from 'expo';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { connect } from "react-redux"
import Loader from '../../Components/activityIndicator';
import { AuthMiddleware } from '../../Store/Middlewares';
import AuthActions from '../../Store/Actions/AuthActions';
import { scale } from '../../Constants/scalingFunction';

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            validation: null,
            userInfo: null,
            passStatus: true,
        }
    }

    async componentDidMount() {
        this.props.reset()
    }

    handleInput(type, value) {
        this.setState({
            [type]: value
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            validation: nextProps.validation
        })
    }

    formSubmit() {
        this.props.reset();
        const { email, password } = this.state;
        var validation = `${
            !email ? 'Please enter your email' :
                email.indexOf('@') == -1 || email.indexOf('.com') == -1 ? 'Please enter valid email id' :
                    !password ? 'Please enter password' :
                        password.length < 8 ? 'Enter password must contain at least 8 characters' : null}`
        if (validation === null || validation === "null") {
            let UserData = { email, password }
            this.setState({ validation: null })
            this.props.logIn(UserData, this.props.navigation)
        } else {
            this.setState({ validation })
        }
    }

    async loginWithFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('367448257053758', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            this.props.loginWithFB(token, this.props.navigation)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Content>
                    <View style={[styles.logoContainer]} >
                        <Image style={{ height: scale(77), width: scale(80) }} source={require('../../../assets/images/screenLogo.png')} />
                    </View>
                    <View style={styles.formContainer} >
                        <Item style={styles.inputCont} >
                            <Ionicons style={styles.inputIcon} name='ios-mail' />
                            <Input ref="1" selectionColor='#bb0a1e' onSubmitEditing={() => this.refs.Password._root.focus()} returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} onChangeText={(text) => this.handleInput('email', text)} placeholder='Email' placeholderTextColor='rgba(0, 0, 0, 0.5)' style={styles.inputField} />
                        </Item>
                        <Item style={styles.inputCont} >
                            <Ionicons style={styles.inputIcon} name='md-lock' />
                            <Input ref='Password' selectionColor='#bb0a1e' onSubmitEditing={() => this.formSubmit()} returnKeyType="done" onChangeText={(text) => this.handleInput('password', text)} placeholder='Password' secureTextEntry={this.state.passStatus} placeholderTextColor='rgba(0, 0, 0, 0.5)' style={styles.inputField} />
                            <TouchableOpacity onPress={() => this.setState({ passStatus: !this.state.passStatus })} >
                                <Ionicons style={styles.inputIcon} name={this.state.passStatus ? 'md-eye' : 'md-eye-off'} />
                            </TouchableOpacity>
                        </Item>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')} style={styles.forgotPCont} >
                            <Text style={styles.forgotPText} >Forgot Password?</Text>
                        </TouchableOpacity>
                        {(this.state.validation !== null || this.state.validation !== 'null') && <Text style={styles.errorTxt} >{this.state.validation}</Text>}
                        <Button onPress={() => this.formSubmit()} style={styles.btn} block >
                            <Text style={styles.btnTxt} >LOG IN</Text>
                        </Button>
                        <View style={styles.orTxt} >
                            <Text style={{ color: '#000' }} >or</Text>
                        </View>
                        <Button onPress={() => this.loginWithFacebook()} style={[styles.btn, { backgroundColor: '#4267b2' }]} block >
                            <Text style={styles.btnTxt} >Log In With Facebook</Text>
                        </Button>
                    </View>
                    <View style={[styles.orTxt, styles.signUpText]} >
                        <Text style={styles.signUpText1} >Don't have an Account yet?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('signUpScreen')} >
                            <Text style={styles.signUp} >SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
                {this.props.isLoading && <Loader />}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.AuthReducer.isLoading,
        validation: state.AuthReducer.validation,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (data, nav) => { dispatch(AuthMiddleware.LogInMiddleware(data, nav)) },
        loginWithFB: (data, nav) => { dispatch(AuthMiddleware.LoginWithFBMiddleware(data, nav)) },
        checkAuth: () => { dispatch(AuthMiddleware.checkAuth()) },
        reset: () => dispatch(AuthActions.resetAllState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);