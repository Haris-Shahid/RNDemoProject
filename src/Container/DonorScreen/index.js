import React from 'react'
import { View, Image, Text, TouchableOpacity, Platform, Modal } from 'react-native';
import { Header, Left, Icon, Body, Content, Button, Right } from 'native-base';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { PushNotificationMiddleware } from '../../Store/Middlewares';
import Loader from '../../Components/activityIndicator';

class DonorScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            averageReview: 0
        }
    }

    componentWillMount() {
        const donor = this.props.navigation.getParam("donor");
        let totalReview = 0;
        if (donor.reviews) {
            donor.reviews.forEach(v => {
                totalReview += v.stars
            })
            let averageReview = totalReview / donor.reviews.length
            if (Number.isInteger(averageReview)) {
                averageReview = `${averageReview}.0`
            }
            this.setState({ averageReview })
        }
    }

    render() {
        const donor = this.props.navigation.getParam("donor");
        let reviewsLength = donor.reviews ? donor.reviews.length : 0;
        const donorsRequestList = this.props.navigation.getParam("donorsRequestList");
        let AuthUser = { name: this.props.name, uid: this.props.uid };
        var pendingStatus;
        if (donorsRequestList.length !== 0) {
            donorsRequestList.forEach(e => {
                if (e.donorUid === donor.uid) {
                    if (e.accept) {
                        pendingStatus = true
                    } else {
                        pendingStatus = false
                    }
                }
            })
        } else {
            pendingStatus = undefined
        }
        return (
            <View style={{ flex: 1 }} >
                <Header style={{ backgroundColor: "#bb0a1e", paddingBottom: Platform.OS === 'android' ? 0 : verticalScale(15) }} >
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Icon name='ios-arrow-back' style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={styles.title}>Donor Details</Text>
                    </Body>
                    <Right><View /></Right>
                </Header>
                <View style={{ flex: 1 }} >
                    <Content>
                        <View style={styles.logoContainer} >
                            <View style={styles.profileIconCont} >
                                {
                                    donor.profileImage === "" ?
                                        <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                        <Image source={{ uri: donor.profileImage }} style={styles.profileImage} />
                                }
                            </View>
                        </View>
                        <Text style={styles.donorNameTxt} >{donor.name}</Text>
                        <View style={styles.detailsCont}>
                            <View style={styles.tabCont} >
                                <Text style={styles.tab1} >Blood Group:</Text>
                                <Text style={styles.bloodGroupTxt} >{donor.group}</Text>
                            </View>
                            <View style={styles.tabCont} >
                                <Text style={styles.tab1} >Contact Number</Text>
                                <Text style={styles.tab2} >{donor.contact}</Text>
                            </View>
                            <View style={styles.tabCont} >
                                <Text style={styles.tab1} >Gender:</Text>
                                <Text style={styles.tab2} >{donor.gender}</Text>
                            </View>
                            <View style={styles.tabCont} >
                                <Text style={styles.tab1} >City:</Text>
                                <Text style={styles.tab2} >{donor.city}</Text>
                            </View>
                            <View style={styles.tabCont} >
                                <Text style={styles.tab1} >Address:</Text>
                                <Text style={styles.tab2} >{donor.address}</Text>
                            </View>
                            <View>
                                <Button block rounded style={[styles.btn, { backgroundColor: pendingStatus ? '#5bb85d' : pendingStatus === undefined ? '#bb0a1e' : '#f1c232' }]} onPress={() => pendingStatus === undefined && this.props.handleAcceptBtnDetails(this.props.navigation, donor, AuthUser)} >
                                    <Text style={styles.btnTxt} >{pendingStatus ? 'Request Accepted' : pendingStatus === undefined ? 'Request For Blood' : 'Pending Request'}</Text>
                                </Button>
                                {
                                    pendingStatus ?
                                        <Button block rounded style={[styles.btn, { backgroundColor: '#bb0a1e' }]} onPress={() => this.props.navigation.navigate('MapScreen', { donor: donor })} >
                                            <Text style={styles.btnTxt} >Locate Him</Text>
                                        </Button> : null
                                }
                            </View>
                        </View>
                        {reviewsLength !== 0 &&
                            <View style={styles.reviewsCont} >
                                <View style={styles.starCont} >
                                    <Ionicons name="ios-star" style={styles.starIcon} />
                                    <Text style={styles.starTxt} >{this.state.averageReview}</Text>
                                    <Text style={styles.reviewCount} >({reviewsLength}) Reviews</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewScreen', { length: reviewsLength, reviews: donor.reviews })} style={{ flex: 1, alignItems: 'flex-end' }} >
                                    <Text style={styles.seeReview} >SEE ALL</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </Content>
                </View>
                {this.props.isLoading && <Loader />}
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleAcceptBtnDetails: (nav, donor, authUser) => dispatch(PushNotificationMiddleware.handleAcceptBtnDetails(nav, donor, authUser))
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.AuthReducer.name,
        uid: state.AuthReducer.uid,
        isLoading: state.DonorReducer.isLoading,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DonorScreen);