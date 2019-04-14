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

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
            email: 'harisshahid00@gmail.com',
            password: 'superheroes',
            validation: null,
            userInfo: null,
            passStatus: true,
        }
    }

    async componentDidMount() {
        this.props.reset();
        await Font.loadAsync({
            'rentuck': require('../../../assets/fonts/Rentuck.ttf'),
        });
        this.setState({
            fontLoaded: true
        })
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
        // nextProps.route && this.props.navigation.navigate('homeScreen');
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
            this.setState({ validation: null })
            let UserData = { email, password }
            this.props.logIn(UserData)
            this.setState({
                validation: null,
            })
        } else {
            this.setState({ validation })
        }
    }

    // async loginWithFacebook() {
    //     const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    //         '367448257053758',
    //         { permissions: ['public_profile'] },
    //     );

    //     if (type == 'success') {
    //         const response = await fetch(
    //             `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`
    //           );
    //           const { picture, name, birthday } = await response.json();
    //           console.log(picture, name, birthday)
    //           fetch(picture.url).then((res)=>console.log(res)).catch((err) => console.log(err))
    //         this.props.loginWithFB(token);
    //     }
    // }

    async loginWithFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('367448257053758', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);

            // Alert.alert(
            //     'Logged in!',
            //     `Hi ${(await response.json()).name}!`,
            // );
            const userInfo = await response.json();
            console.log(userInfo, '//////')
            this.setState({ userInfo })
            // this.props.navigation.navigate('homeScreen', {userInfo: userInfo});
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
                            {this.state.fontLoaded && <Text style={styles.logoText1} >BLOOD</Text>}
                            {this.state.fontLoaded && <Text style={styles.logoText2} >BANK</Text>}
                        </View>
                        <View style={styles.formContainer} >
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-mail' />
                                <Input ref="1" selectionColor='#bb0a1e' onSubmitEditing={() => this.refs.Password._root.focus()} returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} onChangeText={(text) => this.handleInput('email', text)} placeholder='Email' placeholderTextColor='rgba(0, 0, 0, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input ref='Password' selectionColor='#bb0a1e' onSubmitEditing={() => this.formSubmit()} returnKeyType="done" onChangeText={(text) => this.handleInput('password', text)} placeholder='Password' secureTextEntry={this.state.passStatus} placeholderTextColor='rgba(0, 0, 0, 0.5)' style={styles.inputField} />
                                <TouchableOpacity onPress={() => this.setState({passStatus: !this.state.passStatus})} >
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
                            <Text style={{ color: '#fff' }} >Don't have an Account yet?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('signUpScreen')} >
                                <Text style={styles.signUp} >SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                        {/* {this.state.userInfo !== null && <View>
                            <Image source={{uri: this.state.userInfo.picture.data.url}} style={{width: 100, height: 100, borderRadius: 50}} />
                        </View>} */}
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
        validation: state.AuthReducer.validation,
        route: state.AuthReducer.route,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (data) => { dispatch(AuthMiddleware.LogInMiddleware(data)) },
        loginWithFB: (data) => { dispatch(AuthMiddleware.LoginWithFBMiddleware(data)) },
        checkAuth: () => { dispatch(AuthMiddleware.checkAuth()) },
        reset: () => dispatch(AuthActions.resetAllState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);