import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { connect } from "react-redux"
import Loader from '../../Components/activityIndicator';
import { MainMiddleware } from '../../Store/Middlewares';

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
            email: '',
            password: '',
            validation: null,
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

    handleInput(type, value) {
        this.setState({
            [type]: value
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            validation: nextProps.validation
        })
    //    nextProps.route && this.props.navigation.goBack();
    }

    formSubmit() {
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

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Image source={require('../../../assets/images/bgImage.png')} style={styles.bgImage} />
                <View style={styles.childContainer} >
                    <Content>
                        <View style={styles.logoContainer} >
                            {this.state.fontLoaded && <Text style={styles.logoText1} >DEMO</Text>}
                            {this.state.fontLoaded && <Text style={styles.logoText2} >PROJECT</Text>}
                        </View>
                        <View style={styles.formContainer} >
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-mail' />
                                <Input onChangeText={(text) => this.handleInput('email', text)} placeholder='Email' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input onChangeText={(text) => this.handleInput('password', text)} placeholder='Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            {(this.state.validation !== null || this.state.validation !== 'null') && <Text style={styles.errorTxt} >{this.state.validation}</Text>}
                            <Button onPress={() => this.formSubmit()} style={styles.btn} block >
                                <Text style={styles.btnTxt} >LOG IN</Text>
                            </Button>
                            <View style={styles.orTxt} >
                                <Text style={{ color: '#fff' }} >or</Text>
                            </View>
                            <Button style={[styles.btn, { backgroundColor: '#4267b2' }]} block >
                                <Text style={styles.btnTxt} >Log In With Facebook</Text>
                            </Button>
                            <View style={[styles.orTxt, styles.signUpText]} >
                                <Text style={{ color: '#fff' }} >Don't have an Account yet?</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('signUpScreen')} >
                                    <Text style={styles.signUp} >SIGN UP</Text>
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
    console.log(state);
    return {
        isLoading: state.AuthReducer.isLoading,
        validation: state.AuthReducer.validation,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (data) => { dispatch(MainMiddleware.LogInMiddleware(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(LoginScreen);