import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { connect } from "react-redux"
import Loader from '../../Components/activityIndicator';
import { AuthMiddleware } from '../../Store/Middlewares';
import AuthActions from '../../Store/Actions/AuthActions';
import CustomModal from '../../Components/customModal';
import { scale } from '../../Constants/scalingFunction';

class ForgetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
        }
    }

     componentDidMount() {
        this.props.reset();    
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
                     <Content>
                     <View style={[styles.logoContainer]} >
                        <Image style={{ height: scale(77), width: scale(80) }} source={require('../../../assets/images/screenLogo.png')} />
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