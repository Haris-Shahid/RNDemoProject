import React, { Component } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux"
import { Header, Left, Right, Icon, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',

        }
    }

static navigationOptions = {
    drawerIcon: ({tintColor}) => (
        <Icon name='md-mail' style={{color: tintColor, fontSize: 22}} />
    )
}

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <Header style={{ backgroundColor: "#bb0a1e" }} >
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                            <Icon name='md-menu' style={{color: '#fff'}} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.headerTxt} >Hello</Text>
                    </Body>
                    <Right>
                        <View style={styles.profileIconCont} >
                            <Ionicons name='ios-person' style={styles.profileIcon} />
                        </View>
                    </Right>
                </Header>
                <Text>Inbox</Text>
                {/* <Image source={{uri: this.state.imageUrl}} style={{width: 150, height: 150, borderRadius: 50, marginVertical: 20}} />
                <Text>
                    {this.state.name}
                </Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileIconCont: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(30),
        height: verticalScale(30),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(18)
    },
    headerTxt: {
        color: '#fff', 
        fontSize: 20
    },
})

const mapStateToProps = (state) => {
    return {
        isLoading: state.AuthReducer.isLoading,
        validation: state.AuthReducer.validation,
        route: state.AuthReducer.route,
    };
}

export default connect(mapStateToProps, {})(Inbox);