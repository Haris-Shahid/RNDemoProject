import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Header, Left, Icon, Body, Row, Button, } from 'native-base';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { DonorMiddleware } from '../../Store/Middlewares';
import Loader from '../../Components/activityIndicator';

const DonorScreen = (props) => {
    const { address, city, contact, gender, group, name, profileImage, uid, mobToken } = props.navigation.getParam("donor")
    return (
        <View style={{ flex: 1 }} >
            <Header style={{ backgroundColor: "#bb0a1e" }} >
                <Left>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} >
                        <Icon name='ios-arrow-back' style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Text style={styles.title}>Donor Details</Text>
                </Body>
            </Header>
            <View style={{ flex: 1 }} >
                <View style={styles.logoContainer} >
                    <View style={styles.profileIconCont} >
                        {
                            profileImage === "" ?
                                <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        }
                    </View>
                </View>
                <Text style={styles.donorNameTxt} >{name}</Text>
                <View style={styles.detailsCont}>
                    <View style={styles.tabCont} >
                        <Text style={styles.tab1} >Blood Group:</Text>
                        <Text style={styles.bloodGroupTxt} >{group}</Text>
                    </View>
                    <View style={styles.tabCont} >
                        <Text style={styles.tab1} >Contact Number</Text>
                        <Text style={styles.tab2} >{contact}</Text>
                    </View>
                    <View style={styles.tabCont} >
                        <Text style={styles.tab1} >Gender:</Text>
                        <Text style={styles.tab2} >{gender}</Text>
                    </View>
                    <View style={styles.tabCont} >
                        <Text style={styles.tab1} >City:</Text>
                        <Text style={styles.tab2} >{city}</Text>
                    </View>
                    <View style={styles.tabCont} >
                        <Text style={styles.tab1} >Address:</Text>
                        <Text style={styles.tab2} >{address}</Text>
                    </View>
                    <Button block rounded style={styles.btn} onPress={() => props.handleAcceptBtnDetails(props.navigation.getParam("userUid"), props.navigation,props.navigation.getParam("donor")) } >
                        <Text style={styles.btnTxt} >Accept Donor</Text>
                    </Button>
                </View>
            </View>
            {props.isLoading && <Loader />}
        </View>
    )
}
const mapDispatchToProps = (dispatch) => {
    return{
        handleAcceptBtnDetails: (userUid, nav,udetail ) => dispatch(DonorMiddleware.handleAcceptBtnDetails(userUid, nav, udetail))
    }
}

const mapStateToProps = ( state ) => {
    return {
        isLoading: state.DonorReducer.isLoading,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DonorScreen);