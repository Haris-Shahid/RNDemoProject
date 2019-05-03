import React, { Component } from 'react';
import { Text, Image, Platform, Dimensions } from 'react-native';
import * as firebase from 'firebase';

import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import LoginScreen from './Container/Auth/loginScreen';
import SignUpScreen from './Container/Auth/signupScreen';
import ForgetPassword from './Container/Auth/forgetPassword';
import Dashboard from './Container/Dashboard';
import Inbox from './Container/Inbox';
import Notifications from './Container/Notifications';
import Profile from './Container/Profile';
import DonorForm from './Container/DonorForm';
import CustomDrawerComponent from './Components/customDrawerComponent';
import AuthLoader from './Components/authLoader';
import DonorScreen from './Container/DonorScreen';
import ChatScreen from './Container/Chat';
import MapScreen from './Container/Map';

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

const AppDrawNavigator = createDrawerNavigator({
    Home: Dashboard,
    Inbox: Inbox,
    Notifications: Notifications,
    Profile: Profile,
    'Become a Donor' : DonorForm
},{
    contentComponent: CustomDrawerComponent,
    drawerWidth: Dimensions.get('window').width - 100,
    contentOptions: {
        activeTintColor: '#bb0a1e'
    },
}
)

const HomeScreen = createStackNavigator({
    dashboard: AppDrawNavigator,
    donorScreen: DonorScreen,
    ChatScreen: ChatScreen,
    MapScreen: MapScreen,
},{
     headerMode: 'none'
})

const Screens = createSwitchNavigator({
    AuthLoading: { screen: MapScreen },
    Auth: { screen: AuthScreen },
    homeScreen: { screen: HomeScreen }
},{
    initialRouteName: 'AuthLoading'
}
)

const Routers = createAppContainer(Screens)

export default Routers;
