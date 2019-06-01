import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import * as nb from 'native-base';
import { connect } from 'react-redux';

import { styles } from './style';
import CustomHeader from '../../Components/header';
import moment from "moment";

class HistoryScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <nb.Icon name='md-time' style={{ color: tintColor, fontSize: 24 }} />
        )
    }

    render() {
        return (
            <View style={styles.mainCont} >
                <StatusBar hidden={true} />
                <CustomHeader name='History' profileImage={this.props.profileImage} menuIcon={() => this.props.navigation.openDrawer()} />
                <nb.Content>
                    <nb.List>
                        {
                            this.props.authUser.history ?
                                this.props.authUser.history.map(v => {
                                    return (
                                        <nb.ListItem avatar>
                                            <nb.Left>
                                                <nb.Thumbnail source={v.profileImage ? { uri: v.profileImage } : require('../../../assets/images/profileIcon.png')} />
                                            </nb.Left>
                                            <nb.Body>
                                                <nb.Text>Request Accepted</nb.Text>
                                                <nb.Text note >You accept {v.name} blood request</nb.Text>
                                            </nb.Body>
                                            <nb.Right>
                                                <nb.Text note>{moment(v.timeStamp).fromNow()}</nb.Text>
                                            </nb.Right>
                                        </nb.ListItem>
                                    )
                                })
                                :
                                <nb.Text style={styles.note} note >There is no history yet.</nb.Text>
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