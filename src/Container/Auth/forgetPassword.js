import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { Font } from 'expo';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { connect } from "react-redux"
import Loader from '../../Components/activityIndicator';
import { AuthMiddleware } from '../../Store/Middlewares';
import AuthActions from '../../Store/Actions/AuthActions';
import CustomModal from '../../Components/customModal';

class ForgetPassword extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false,
            email: 'harisshahid00@gmail.com',
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

    formSubmit() {
        const { email } = this.state;
        var validation = `${
            !email ? 'Please enter your email' :
                email.indexOf('@') == -1 || email.indexOf('.com') == -1 ? 'Please enter valid email id' : null}`
        if (validation === null || validation === "null") {
            this.props.forgetPassword(email)
            this.setState({ validation: null })
        } else {
            this.setState({ validation })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            validation: nextProps.validation
        })
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
                            {this.state.fontLoaded && <Text style={styles.logoText1} >BLOOD</Text>}
                            {this.state.fontLoaded && <Text style={styles.logoText2} >BANK</Text>}
                        </View>
                        <View style={styles.formContainer} >
                            <Text style={styles.fgpasswordTitle} >Forgot Your Password</Text>
                            <Text style={styles.fgpassInst} >Enter your email below to receive your password reset instructions</Text>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='ios-mail' />
                                <Input ref="1" selectionColor='#bb0a1e' onSubmitEditing={() => this.formSubmit()} returnKeyType="done" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} onChangeText={(text) => this.setState({ email: text })} placeholder='Email' placeholderTextColor='rgba(0, 0, 0, 0.5)' style={styles.inputField} />
                            </Item>
                            {(this.state.validation !== null || this.state.validation !== 'null') && <Text style={styles.errorTxt} >{this.state.validation}</Text>}
                            <Button onPress={() => this.formSubmit()} style={styles.btn} block >
                                <Text style={styles.btnTxt} >Send Password</Text>
                            </Button>
                            <Button onPress={() => this.props.navigation.goBack()} style={styles.btn} block >
                                <Text style={styles.btnTxt} >Go Back</Text>
                            </Button>
                        </View>
                    </Content>
                    {this.props.isLoading && <Loader />}
                </View>
                <CustomModal title='Please check your email to reset your password' visible={this.props.navigateRoute} handleModal={() => this.handleModal()} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.AuthReducer.isLoading,
        validation: state.AuthReducer.validation,
        navigateRoute: state.AuthReducer.navigateRoute,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        forgetPassword: (em) => dispatch(AuthMiddleware.forgetPassword(em)),
        reset: () => dispatch(AuthActions.resetAllState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);