import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import * as nb from 'native-base';
import { connect } from 'react-redux';

import { styles } from './style';
import moment from "moment";

class HistoryScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const donorH = this.props.navigation.getParam("donorHistory");
        return (
            <View style={styles.mainCont} >
                <StatusBar hidden={true} />
                <nb.Header style={styles.header} >
                    <nb.Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <nb.Icon name='ios-arrow-back' style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </nb.Left>
                    <nb.Body>
                        <Text style={styles.title}>{`${donorH.name}'s`} History</Text>
                    </nb.Body>
                    <nb.Right><View /></nb.Right>
                </nb.Header>
                <nb.Content>
                    <nb.List>
                        {
                            donorH.history.map(v => {
                                return (
                                    <nb.ListItem avatar>
                                        <nb.Left>
                                            <nb.Thumbnail source={v.profileImage ? { uri: v.profileImage } : require('../../../assets/images/profileIcon.png')} />
                                        </nb.Left>
                                        <nb.Body>
                                            <nb.Text>Request Accepted</nb.Text>
                                            <nb.Text note >{donorH.name} accept {v.name} blood request</nb.Text>
                                        </nb.Body>
                                        <nb.Right>
                                            <nb.Text note>{moment(v.timeStamp).fromNow()}</nb.Text>
                                        </nb.Right>
                                    </nb.ListItem>
                                )
                            })
                        }
                    </nb.List>
                </nb.Content>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.AuthReducer.userDetail,
    profileImage: state.AuthReducer.profileImage,
})

export default connect(mapStateToProps, {})(HistoryScreen);