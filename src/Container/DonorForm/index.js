import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Container, Content, Icon, Item, Label, Input, Button, Picker, Card, CardItem, Form } from 'native-base';
import CustomHeader from '../../Components/header';
import { connect } from "react-redux"
import { DonorMiddleware } from '../../Store/Middlewares';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import Loader from '../../Components/activityIndicator';

class DonorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            group: 'A+',
            gender: [
                {
                    name: 'Male',
                    status: true
                },
                {
                    name: 'Female',
                    status: false
                }
            ],
            genderSelected: 'Male',
            address: '',
            city: '',
            isDonated: false,
        }
    }
    // static navigationOptions = this.props.bloodDonor &&  {
    //     drawerLabel: () => null
    // }

handleRadio(g) {
    const { gender } = this.state;
    if (g === "male") {
        gender[0].status = true;
        gender[1].status = false;
        this.setState({ gender, genderSelected: 'Male' })
    } else {
        gender[0].status = false;
        gender[1].status = true;
        this.setState({ gender, genderSelected: 'Female' })
    }
}
submit() {
    const { contact, group, address, city, genderSelected } = this.state;
    if (contact && group && genderSelected && address && city) {
        let donorDetails = {
            contact,
            group,
            gender: genderSelected,
            city,
            address,
            bloodDonor: true
        }
        this.props.submitDonorDetails(donorDetails, this.props.userUid, this.props.navigation);
    } else {
        alert('Please enter all fields correctly');
    }
}
render() {
    return (
        <Container style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <CustomHeader name='Donate Blood' profileImage={this.props.profileImage} menuIcon={() => this.props.navigation.openDrawer()} />
            <Content>
                <Card style={{ width: '90%', alignSelf: 'center' }} >
                    <CardItem style={{ justifyContent: 'center' }} >
                        <View style={styles.logoContainer} >
                            <View style={styles.profileIconCont} >
                                {
                                    this.props.profileImage === "" ?
                                        <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                        <Image source={{ uri: this.props.profileImage }} style={styles.profileImage} />
                                }
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Item style={styles.inputCont} >
                            <Input value={this.props.name} disabled={true} style={styles.inputField} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item style={styles.inputCont} >
                            <Input selectionColor='#bb0a1e' returnKeyType='done' placeholder='Type Your Number' placeholderTextColor='rgba(100, 100, 100, 0.5)' keyboardType="phone-pad" onChangeText={(val) => this.setState({ contact: val })} style={styles.inputField} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item style={styles.inputCont} >
                            <Input selectionColor='#bb0a1e' returnKeyType='done' placeholder='City' placeholderTextColor='rgba(100, 100, 100, 0.5)' onChangeText={(val) => this.setState({ city: val })} style={styles.inputField} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <Item style={styles.inputCont} >
                            <Input selectionColor='#bb0a1e' returnKeyType='done' placeholder='Address' placeholderTextColor='rgba(100, 100, 100, 0.5)' onChangeText={(val) => this.setState({ address: val })} style={styles.inputField} />
                        </Item>
                    </CardItem>
                    <CardItem>
                        <View style={styles.radioBtnCont} >
                            <View style={styles.radioBtnChildCont} >
                                <TouchableOpacity onPress={() => this.handleRadio('male')} >
                                    <Ionicons style={styles.radioBtn} name={this.state.gender[0].status ? "md-radio-button-on" : "md-radio-button-off"} />
                                </TouchableOpacity>
                                <Text style={styles.radioTxt} >Male</Text>
                            </View>
                            <View style={styles.radioBtnChildCont} >
                                <TouchableOpacity onPress={() => this.handleRadio('female')} >
                                    <Ionicons style={styles.radioBtn} name={this.state.gender[1].status ? "md-radio-button-on" : "md-radio-button-off"} />
                                </TouchableOpacity>
                                <Text style={styles.radioTxt} >Female</Text>
                            </View>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Label>Blood Types: </Label>
                        <View style={styles.form} >
                            <Picker style={{ color: '#bb0a1e' }} onValueChange={(value) => this.setState({ group: value })} selectedValue={this.state.group}>
                                <Item color='#bb0a1e' label="A+" value="A+" />
                                <Item color='#bb0a1e' label="AB+" value="AB+" />
                                <Item color='#bb0a1e' label="B+" value="B+" />
                                <Item color='#bb0a1e' label="O+" value="O+" />
                                <Item color='#bb0a1e' label="A-" value="A-" />
                                <Item color='#bb0a1e' label="AB-" value="AB-" />
                                <Item color='#bb0a1e' label="B-" value="B-" />
                                <Item color='#bb0a1e' label="O-" value="O-" />
                            </Picker>
                        </View>
                    </CardItem>
                    <Button rounded onPress={() => this.submit()} style={styles.btn} >
                        <Text style={styles.btnTxt} >Become a Donor</Text>
                    </Button>
                </Card>
            </Content>
            {this.props.isLoading && <Loader />}
        </Container>
    )
}
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.DonorReducer.isLoading,
        profileImage: state.AuthReducer.profileImage,
        name: state.AuthReducer.name,
        userUid: state.AuthReducer.uid,
        bloodDonor: state.DonorReducer.bloodDonor
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitDonorDetails: (data, uid, nav) => dispatch(DonorMiddleware.submitDonorDetails(data, uid, nav)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorForm);