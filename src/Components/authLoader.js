import React from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet } from 'react-native';
import { scale } from '../Constants/scalingFunction';
import AuthActions from '../Store/Actions/AuthActions'
import { connect } from 'react-redux';

class AuthLoader extends React.Component {
    constructor() {
        super();
        this.loadApp()
    }

    async loadApp() {
        const userToken = await AsyncStorage.getItem('userToken')
        let userData = JSON.parse(userToken);
        this.props.recoverUserData(userData.user);
        this.props.navigation.navigate(userToken ? 'homeScreen' : 'Auth')
    }

    render() {
        return (
            <View style={styles.container} >
                <ActivityIndicator animating={true} size={scale(50)} color="#bb0a1e" />
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
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

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoader);
