import React, { Component } from 'react';
import { View,  Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux"
import { Header, Left, Right, Icon, Body, List, ListItem, Thumbnail, Content,Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../../Constants/scalingFunction';
import CustomHeader from '../../Components/header';

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',

        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name='md-mail' style={{ color: tintColor, fontSize: 22 }} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <CustomHeader name='Inbox' profileImage={this.props.profileImage} menuIcon={() => this.props.navigation.openDrawer()} />
                <Content>
                    <List>
                        <ListItem avatar>
                        <TouchableOpacity>
                            <Left>
                            <View style={styles.profileIconCont} >
                                    {
                                        this.props.profileImage == '' || !this.props.profileImage ?
                                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                            <Image source={{ uri: this.props.profileImage }} style={styles.profileImage} />
                                    }
                                </View>
                            </Left>
                            <Body>
                                <Text>Kumar Pratik</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                            </TouchableOpacity>
                        </ListItem>
                    </List>
                </Content>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profileIconCont: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(50),
        height: verticalScale(50),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: moderateScale(25)
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
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