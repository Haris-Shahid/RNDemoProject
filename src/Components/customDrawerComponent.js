import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale, scale, moderateScale } from '../Constants/scalingFunction';
import { AuthMiddleware } from '../Store/Middlewares';

class CustomDrawerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averageReview: 0
        }
    }

    handleAverageReview(reviews) {
        let totalReview = 0;
        if (reviews) {
            reviews.forEach(v => {
                totalReview += v.stars
            })
            let averageReview = totalReview / reviews.length
            if (Number.isInteger(averageReview)) {
                averageReview = `${averageReview}.0`
            }
            this.setState({ averageReview })
        }
    }

    componentWillReceiveProps(props) {
        if (props.auth.userDetail.reviews) {
            this.handleAverageReview(props.auth.userDetail.reviews)
        }
    }

    render() {
        const { items, ...rest } = this.props;
        const filteredItems = this.props.bloodDonor ? items.filter(item => item.key !== "Become a Donor") : items;
        return (
            <SafeAreaView style={{ flex: 1 }} >
                <View style={styles.userProfileCont} >
                    <View style={styles.profileIconCont} >
                        {
                            this.props.auth.profileImage == '' || !this.props.auth.profileImage ?
                                <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                <Image source={{ uri: this.props.auth.profileImage }} style={{ width: '100%', height: '100%' }} />
                        }
                    </View>
                    <View style={{ marginLeft: scale(20), }} >
                        <Text style={styles.userName} >{this.props.auth.name}</Text>
                        {this.props.auth.userDetail.reviews &&
                            <View style={styles.starCont} >
                                <Ionicons name="ios-star" style={styles.starIcon} />
                                <Text style={styles.starTxt} >{this.state.averageReview}</Text>
                                <Text style={styles.reviewCount} >({this.props.auth.userDetail.reviews.length})</Text>
                            </View>
                        }
                    </View>

                </View>
                <ScrollView>
                    <DrawerItems items={filteredItems} {...rest} />
                    {this.props.bloodDonor && <Text style={styles.bdTxt} >You are a Blood Donor</Text>}
                    <View style={styles.logoutCont} >
                        <TouchableOpacity onPress={() => this.props.signOut(this.props.navigation)} style={styles.logoutBtn} >
                            <Text style={styles.logoutTxt} >Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.AuthReducer.isLoading,
        auth: state.AuthReducer,
        validation: state.AuthReducer.validation,
        bloodDonor: state.DonorReducer.bloodDonor
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (nav) => { dispatch(AuthMiddleware.SignOutMiddleware(nav)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerComponent);

const styles = StyleSheet.create({
    userProfileCont: {
        height: verticalScale(120),
        alignItems: 'center',
        backgroundColor: '#bb0a1e',
        paddingHorizontal: scale(20),
        flexDirection: 'row',
    },
    profileIconCont: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: verticalScale(70),
        height: verticalScale(70),
        overflow: 'hidden'
    },
    profileIcon: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: moderateScale(40)
    },
    userName: {
        color: '#fff',
        fontSize: moderateScale(20),
    },
    logoutCont: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.5)'
    },
    logoutBtn: {
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10)
    },
    logoutTxt: {
        fontSize: moderateScale(18),
        color: '#bb0a1e'
    },
    bdTxt: {
        fontSize: moderateScale(16),
        color: '#bb0a1e',
        marginHorizontal: scale(20),
        marginBottom: verticalScale(10)
    },
    reviewCount: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#fff'
    },
    starCont: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    starIcon: {
        color: '#fe9605',
        fontSize: moderateScale(16)
    },
    starTxt: {
        color: '#fe9605',
        fontSize: moderateScale(16),
        marginHorizontal: scale(5)
    }
})

