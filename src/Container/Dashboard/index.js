import React, { Component } from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { connect } from "react-redux"
import * as nb from 'native-base';
import CustomHeader from '../../Components/header';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import Loader from '../../Components/activityIndicator';
import { Notifications } from 'expo';
import Badge from './badge';
import { PushNotificationMiddleware, MessageMiddleware, DonorMiddleware, LocationMiddleware, ReviewMiddleware } from '../../Store/Middlewares';
import Modal from "react-native-modal";
import ModalView from './modalView';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            selected: 'all',
            filterdDonors: [],
            donorsRequestList: [],
            acceptDonor: { acceptedUser: { name: 'he', profileImage: '' } },
            starCount: 3.5,
            review: '',
            showModal: false,
            validateReview: false
        }
    }

    async componentDidMount() {
        this.props.getUserLocation(this.props.uid);
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
            if (n.data.dueTo === "Blood Request") {
                this.props.navigation.navigate('Notifications');
            } else if (n.data.dueTo === "Accept Request") {
                this.setState({ showModal: true, acceptDonor: n.data })
            }
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
    }

    reviewSubmit() {
        if (this.state.review === "" || this.state.review === " ") {
            this.setState({ validateReview: true })
        } else {
            let review = {
                review: this.state.review,
                stars: this.state.starCount,
                from: this.props.uid,
                name: this.props.name,
                profileImage: this.props.profileImage,
                timeStamp: new Date().getTime()
            }
            this.props.handleReview(review, this.state.acceptDonor.acceptedUser.uid)
            this.setState({ showModal: false })
        }
    }
    render() {
        const { acceptDonor, starCount, showModal, validateReview } = this.state;
        return (
            <View style={{ flex: 1 }} >
                <StatusBar hidden={true} />
                <CustomHeader name={this.props.name} profileImage={this.props.profileImage} menuIcon={() => this.props.navigation.openDrawer()} navigate={() => this.props.navigation.navigate('Profile')} />
                {this.props.isLoading ? <Loader /> :
                    <View style={styles.childCont} >
                        <View>
                            <Text style={styles.formTitle} >Seacrh donor by their blood group</Text>
                            <nb.Form style={styles.form} >
                                <nb.Picker mode="dropdown" onValueChange={value => this.onValueChange(value)} selectedValue={this.state.selected}>
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
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <nb.Card style={styles.mainCardCont} >
                                <nb.CardItem header>
                                    <nb.Text>List of Donors</nb.Text>
                                </nb.CardItem>
                                <View style={styles.scrollCont} >
                                    <ScrollView >
                                        {this.state.filterdDonors.length !== 0 ?
                                            this.state.filterdDonors.map((d, i) => {
                                                if (this.props.uid === d.uid) {
                                                    return null;
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
                                                                        <Text style={styles.userNameTxt} >{d.name}</Text>
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
                                                                    <Text style={styles.userNameTxt} >{d.name}</Text>
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
                                </View>
                            </nb.Card>
                        </View>
                    </View>
                }
                <Modal isVisible={showModal}>
                    <ModalView validateReview={validateReview} reviewSubmit={() => this.reviewSubmit()} donorDetails={acceptDonor} starCount={starCount} onStarRatingPress={starCount => this.setState({ starCount })} handleReviewTxt={(text => this.setState({ review: text, validateReview: false }))} />
                </Modal>
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
        handleReview: (r, dUid) => dispatch(ReviewMiddleware.handleReview(r, dUid)),
        getUserLocation: (uid) => dispatch(LocationMiddleware.getUserLocation(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);