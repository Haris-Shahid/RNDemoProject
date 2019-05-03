import React from 'react';
import { View, AsyncStorage, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AuthActions from '../Store/Actions/AuthActions'
import { connect } from 'react-redux';

class AuthLoader extends React.Component {
    constructor() {
        super();
        this.loadApp()
    }

    async loadApp() {
        const userToken = await AsyncStorage.getItem('userToken')
        if (userToken) {
            let userData = JSON.parse(userToken);
            this.props.recoverUserData(userData.user);
        }
        this.props.navigation.navigate(userToken ? 'homeScreen' : 'Auth')
    }

    render() {
        return (
            <View style={styles.container} >
              <ActivityIndicator animating={true} size='large' color="#bb0a1e" />
                {/* <Image source={require('../../assets/images/splash.png')} style={{ width: '100%', height: '100%' }} resizeMode='cover' /> */}
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        recoverUserData: (data) => dispatch(AuthActions.recoverUserData(data)),
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoader);
