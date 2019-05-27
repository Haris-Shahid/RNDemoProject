import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as nb from 'native-base';
import { styles } from './style';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';

const ModalView = (props) => {
    const { name, profileImage } = props.donorDetails.acceptedUser;
    return (
        <View style={{ backgroundColor: 'white' }}>
            <Text style={styles.modalHead} >Your Blood Request Accepted</Text>
            <View style={styles.donorIconCont} >
                {
                    profileImage === "" || !profileImage ?
                        <Ionicons name='ios-person' style={styles.donorIcon} /> :
                        <Image source={{ uri: profileImage }} style={styles.donorImage} />
                }
            </View>
            <Text style={styles.modalName} >{name}</Text>
            <View style={styles.separater} />
            <Text style={styles.starTxt} >Tap a Star to Rate</Text>
            <StarRating containerStyle={styles.starCont} maxStars={5} rating={props.starCount} fullStarColor='#fe9605' halfStarEnabled={true} selectedStar={(rating) => props.onStarRatingPress(rating)} />
            <View style={styles.separater} />
            <nb.Textarea rowSpan={4} bordered selectionColor='#bb0a1e' onSubmitEditing={() => props.reviewSubmit()} returnKeyType="done" autoCapitalize="none" autoCorrect={false} onChangeText={(text) => props.handleReviewTxt(text)} placeholder='Leave a review' placeholderTextColor='rgba(0, 0, 0, 0.5)' style={[styles.inputField, { borderColor: props.validateReview ? '#bb0a1e' : '#9d9d9d' }]} />
            <nb.Button block rounded style={[styles.btn1, { backgroundColor: '#bb0a1e' }]} onPress={() => props.reviewSubmit()} >
                <Text style={styles.btn1Txt} >Submit</Text>
            </nb.Button>
        </View>
    )
}

export default ModalView;