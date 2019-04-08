import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import { Content, Item, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false
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
                                <Input placeholder='Email' placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Item style={styles.inputCont} >
                                <Ionicons style={styles.inputIcon} name='md-lock' />
                                <Input placeholder='Password' secureTextEntry={true} placeholderTextColor='rgba(100, 100, 100, 0.5)' style={styles.inputField} />
                            </Item>
                            <Button style={styles.btn} block >
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('signUpScreen') } >
                                    <Text style={styles.signUp} >SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Content>
                </View>
            </View>
        )
    }
}

export default LoginScreen;