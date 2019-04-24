import React, { Component } from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from "react-redux"
import * as nb from 'native-base';
import CustomHeader from '../../Components/header';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { DonorMiddleware } from '../../Store/Middlewares';
import Loader from '../../Components/activityIndicator';
import { Notifications } from 'expo';
import Badge from './badge';
import { PushNotificationMiddleware } from '../../Store/Middlewares';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            selected: 'all',
            filterdDonors: [],
            requestSendTo: []
        }
    }

    async componentDidMount() {
        await this.props.GetDonors(this.props.uid);
        this.props.getNotification(this.props.uid)
        const { selected } = this.state;
        if (selected === 'all') {
            this.setState({
                filterdDonors: this.props.userList
            })

        }
        Notifications.addListener((n) => this._handleNotification(n))
    }
    _handleNotification(n) {
        if (n.origin === "selected") {
            this.props.navigation.navigate('Notifications', { userDetail: n.data });
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            filterdDonors: nextProps.userList
        })
        if (nextProps.userList) {
            nextProps.userList.map((v, i) => {
                if (v.requestSendTo && v.uid === this.props.uid) {
                    this.setState({ requestSendTo: v.requestSendTo })
                }
            })
        }
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <nb.Icon name='md-home' style={{ color: tintColor, fontSize: 24 }} />
        )
    }
    onValueChange(value) {
        const { userList } = this.props;
        if (value === 'all') {
            this.setState({ filterdDonors: userList, selected: 'all' });
        } else {
            let filterdDonors = [];
            userList.map((v, i) => {
                if (v.group === value) {
                    filterdDonors.push(v);
                }
            })
            this.setState({ filterdDonors, selected: value })

        }
    };
    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <CustomHeader name={this.props.name} profileImage={this.props.profileImage} menuIcon={() => this.props.navigation.openDrawer()} />
                <nb.Content>
                    <View style={styles.formCont} >
                        <Text style={styles.formTitle} >Seacrh donor by their blood group</Text>
                        <nb.Form style={styles.form} >
                            <nb.Picker style={{ color: '#bb0a1e' }} onValueChange={value => this.onValueChange(value)} selectedValue={this.state.selected}>
                                <nb.Item color='#bb0a1e' label="All" value="all" />
                                <nb.Item color='#bb0a1e' label="A+" value="A+" />
                                <nb.Item color='#bb0a1e' label="AB+" value="AB+" />
                                <nb.Item color='#bb0a1e' label="B+" value="B+" />
                                <nb.Item color='#bb0a1e' label="O+" value="O+" />
                                <nb.Item color='#bb0a1e' label="A-" value="A-" />
                                <nb.Item color='#bb0a1e' label="AB-" value="AB-" />
                                <nb.Item color='#bb0a1e' label="B-" value="B-" />
                                <nb.Item color='#bb0a1e' label="O-" value="O-" />
                            </nb.Picker>
                        </nb.Form>
                        <nb.Card style={styles.mainCardCont} >
                            <nb.CardItem header>
                                <nb.Text>List of Donors</nb.Text>
                            </nb.CardItem>
                            <nb.CardItem>
                                <ScrollView style={{ height: Dimensions.get('window').height - 290 }} >
                                    {this.state.filterdDonors.length !== 0 ?
                                        this.state.filterdDonors.map((d, i) => {
                                            if (this.props.uid === d.uid) {
                                                return (
                                                    <nb.Card key={i} >
                                                        <nb.CardItem style={{ flexDirection: 'row' }} >
                                                            <View style={{ flex: 1 }} >
                                                                <View style={styles.profileIconCont} >
                                                                    {
                                                                        d.profileImage == '' || !d.profileImage ?
                                                                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                                                            <Image source={{ uri: d.profileImage }} style={styles.userProfile} />
                                                                    }
                                                                </View>
                                                            </View>
                                                            <View style={styles.userName} >
                                                                <Text>{d.name}</Text>
                                                            </View>
                                                        </nb.CardItem>
                                                    </nb.Card>
                                                )
                                            }
                                            return (
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('donorScreen', { donor: d, userUid: this.props.uid, requestSendTo: this.state.requestSendTo })} key={i} >
                                                    <nb.Card>
                                                        <nb.CardItem style={{ flexDirection: 'row' }} >
                                                            <View style={{ flex: 1 }} >
                                                                <View style={styles.profileIconCont} >
                                                                    {
                                                                        d.profileImage == '' || !d.profileImage ?
                                                                            <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                                                            <Image source={{ uri: d.profileImage }} style={styles.userProfile} />
                                                                    }
                                                                </View>
                                                            </View>
                                                            <View style={styles.userName} >
                                                                <Text>{d.name}</Text>
                                                            </View>
                                                            <Badge uid={d.uid} requestSendTo={this.state.requestSendTo} />
                                                        </nb.CardItem>
                                                    </nb.Card>
                                                </TouchableOpacity>
                                            )
                                        })
                                        :
                                        <nb.Card>
                                            <nb.CardItem>
                                                <nb.Text>There is no donor available in the list right now.</nb.Text>
                                            </nb.CardItem>
                                        </nb.Card>
                                    }
                                </ScrollView>
                            </nb.CardItem>
                        </nb.Card>
                    </View>

                </nb.Content>

                {this.props.isLoading && <Loader />}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.DonorReducer.isLoading,
        userList: state.DonorReducer.userList,
        profileImage: state.AuthReducer.profileImage,
        name: state.AuthReducer.name,
        uid: state.AuthReducer.uid,
        rqsendTo: state.AuthReducer.requestSendTo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetDonors: (uid) => dispatch(DonorMiddleware.GetDonors(uid)),
        getNotification: (uid) => dispatch(PushNotificationMiddleware.getNotification(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);