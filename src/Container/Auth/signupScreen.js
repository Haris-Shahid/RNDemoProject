import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { connect } from "react-redux"
import Loader from '../../Components/activityIndicator';
import { scale } from '../../Constants/scalingFunction';
import { AuthMiddleware } from '../../Store/Middlewares';
import AuthActions from '../../Store/Actions/AuthActions';
import CustomModal from '../../Components/customModal';

class SignUpScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            retypePassword: '',
            validation: null,
            loading: false,
        }
    }
    componentDidMount() {
        this.props.reset();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            validation: nextProps.validation
        })
    }

    handleInput(type, value) {
        this.setState({
            [type]: value
        })
    }

    formSubmit() {
        const { name, email, password, retypePassword } = this.state;
        var validation = `${
            !name ? 'Please enter your First Name' :
                !email ? 'Please enter your email' :
                    email.indexOf('@') == -1 || email.indexOf('.com') == -1 ? 'Please enter valid email id' :
                        !password ? 'Please enter password' :
                            password.length < 8 ? 'Enter password must contain at least 8 characters' :
                                !retypePassword ? 'Please enter Retype password to confirm your password' :
                                    retypePassword !== password ? "Your password doesn't match" : null}`
        if (validation === null || validation === "null") {
            let UserData = { name, email, profileImage: this.props.profileImage }
            this.props.signUp(UserData, password, this.props.navigation)
            this.setState({ validation: null })
        } else {
            this.setState({ validation })
        }
    }

    async handleModal() {
        await this.props.reset();
        this.props.navigation.goBack();
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
                                            <ActivityIndicator animating={true} size={scale(25)} color="rgba(255,255,255,0.5)" /> :
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
                                <Input ref="1" selectionColor='#bb0a1e' onSubmitEditing={() => this.refs.email._root.focus()} returnKeyType="next" onChangeText={(text) => this.handleInput('name', text)} placeholder='Your Name' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-mail' />
                                <Input ref='email' selectionColor='#bb0a1e' keyboardType="email-address" onSubmitEditing={() => this.refs.password._root.focus()} returnKeyType='next' autoCapitalize="none" autoCorrect={false} onChangeText={(text) => this.handleInput('email', text)} placeholder='Email' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input ref='password' selectionColor='#bb0a1e' onSubmitEditing={() => this.refs.resetPassword._root.focus()} returnKeyType='next' onChangeText={(text) => this.handleInput('password', text)} placeholder='Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input ref='resetPassword' selectionColor='#bb0a1e' onSubmitEditing={() => this.formSubmit()} returnKeyType='done' onChangeText={(text) => this.handleInput('retypePassword', text)} placeholder='Retype Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            {(this.state.validation !== null || this.state.validation !== 'null') && <Text style={styles.errorTxt} >{this.state.validation}</Text>}
                            <Button onPress={() => this.formSubmit()} style={styles.btn} block >
                                <Text style={styles.btnTxt} >SIGN UP</Text>
                            </Button>
                        </View>
                        <View style={[styles.orTxt, styles.signUpText]} >
                            <Text style={{ color: '#fff' }} >Already have an Account?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                                <Text style={styles.signUp} >LOGIN NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                    {this.props.isLoading && <Loader />}
                </View>
                <CustomModal visible={this.props.navigateRoute} handleModal={() => this.handleModal()} />
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
        navigateRoute: state.AuthReducer.navigateRoute,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (data, p, nav) => { dispatch(AuthMiddleware.SignUpMiddleware(data, p, nav)) },
        UploadImage: (uri) => { dispatch(AuthMiddleware.UploadImage(uri)) },
        reset: () => dispatch(AuthActions.resetAllState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);