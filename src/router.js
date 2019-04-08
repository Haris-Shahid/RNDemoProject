import React, { Component } from 'react';
import { Text, Image, Platform } from 'react-native';
import * as firebase from 'firebase';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './Container/Auth/loginScreen';
import SignUpScreen from './Container/Auth/signupScreen';


const Screens = createStackNavigator({
    home: {
         screen: LoginScreen
    },
    signUpScreen: { 
        screen: SignUpScreen
    }
},{
    headerMode: 'none'
})

const Routers = createAppContainer(Screens)

export default Routers;
