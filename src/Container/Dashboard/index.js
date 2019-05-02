import React, { Component } from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from "react-redux"
import * as nb from 'native-base';
import CustomHeader from '../../Components/header';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import Loader from '../../Components/activityIndicator';
import { Notifications } from 'expo';
import Badge from './badge';
import { PushNotificationMiddleware, MessageMiddleware, DonorMiddleware } from '../../Store/Middlewares';
import moment from 'moment';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            selected: 'all',
            filterdDonors: [],
            donorsRequestList: []
        }
    }

    async componentDidMount() {
        await this.props.GetDonors(this.props.uid);
        this.props.getNotification(this.props.uid)
        this.props.getChat(this.props.uid)
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
            this.props.navigation.navigate('Notifications');
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            filterdDonors: nextProps.userList,
        })
        if (nextProps.donorsRequestList) {
            this.setState({ donorsRequestList: nextProps.donorsRequestList })
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
                {this.props.isLoading ? <Loader /> :
                    <nb.Content>
                        <View style={styles.formCont} >
                            <Text style={styles.formTitle} >Seacrh donor by their blood group</Text>
                            <nb.Form style={styles.form} >
                                <nb.Picker onValueChange={value => this.onValueChange(value)} selectedValue={this.state.selected}>
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
                                                if (d.disableTimer) {
                                                    var disableStatus;
                                                    if (this.state.donorsRequestList.length !== 0) {
                                                        this.state.donorsRequestList.forEach(e => {
                                                            if (e.donorUid === d.uid) {
                                                                if (e.accept) {
                                                                    disableStatus = true
                                                                } else {
                                                                    disableStatus = true
                                                                }
                                                            }
                                                        })
                                                    } else {
                                                        disableStatus = false
                                                    }
                                                    return (
                                                        <TouchableOpacity onPress={() => disableStatus && this.props.navigation.navigate('donorScreen', { donor: d, donorsRequestList: this.state.donorsRequestList })} key={i} >
                                                            <nb.Card style={{ opacity: disableStatus ? 1 : 0.5 }} >
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
                                                                    <View style={styles.acBtnCont}>
                                                                        <View style={[styles.btn, { backgroundColor: disableStatus ? '#5bb85d' : '#bb0a1e' }]} >
                                                                            <Text style={[styles.btnTxt, { color: '#fff' }]} >{disableStatus ? 'ACCEPTED' : 'AWAY'}</Text>
                                                                        </View>
                                                                    </View>
                                                                </nb.CardItem>
                                                            </nb.Card>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                                return (
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('donorScreen', { donor: d, donorsRequestList: this.state.donorsRequestList })} key={i} >
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
                                                                <Badge donorUid={d.uid} donorsRequestList={this.state.donorsRequestList} />
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
                }
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
        donorsRequestList: state.DonorReducer.donorsRequestList,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetDonors: (uid) => dispatch(DonorMiddleware.GetDonors(uid)),
        getNotification: (uid) => dispatch(PushNotificationMiddleware.getNotification(uid)),
        getChat: (uid) => dispatch(MessageMiddleware.getChat(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);