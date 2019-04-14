import React, { Component } from 'react';
import { Text, Image, Platform } from 'react-native';
import * as firebase from 'firebase';

import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './Container/Auth/loginScreen';
import SignUpScreen from './Container/Auth/signupScreen';
import ForgetPassword from './Container/Auth/forgetPassword';
import Dashboard from './Container/Dashboard';

const AuthScreen = createStackNavigator({
    loginScreen: {
        screen: LoginScreen
    },
    signUpScreen: {
        screen: SignUpScreen
    },
    ForgetPassword: {
        screen: ForgetPassword
    },
}, {
        headerMode: 'none'
    })

const HomeScreen = createStackNavigator({
    dashboard: {
        screen: Dashboard
    }
}, {
        headerMode: 'none'
    })

const Screens = createSwitchNavigator({
    Auth: { screen: AuthScreen },
    homeScreen: { screen: HomeScreen }
},{
    initialRouteName: 'Auth'
}
)

const Routers = createAppContainer(Screens)

export default Routers;
