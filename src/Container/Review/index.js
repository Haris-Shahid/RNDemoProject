import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import * as nb from 'native-base';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import StarRating from 'react-native-star-rating';

class ReviewScreen extends Component {
    render() {
        const length = this.props.navigation.getParam("length");
        const reviews = this.props.navigation.getParam("reviews");
        return (
            <View style={styles.cont} >
                <nb.Header style={styles.header} >
                    <nb.Left>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <nb.Icon name='ios-arrow-back' style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </nb.Left>
                    <nb.Body>
                        <Text style={styles.title}>{length} Reviews</Text>
                    </nb.Body>
                    <nb.Right><View /></nb.Right>
                </nb.Header>
                <nb.Content>
                    <nb.List>
                        <FlatList
                            data={reviews}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <nb.ListItem avatar >
                                        <nb.Left>
                                            <View style={styles.profileIconCont} >
                                                {
                                                    item.profileImage == '' || !item.profileImage ?
                                                        <Ionicons name='ios-person' style={styles.profileIcon} /> :
                                                        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                                                }
                                            </View>
                                        </nb.Left>
                                        <nb.Body>
                                            <nb.Text>{item.name}</nb.Text>
                                            <nb.Text note>{item.review}</nb.Text>
                                            <StarRating containerStyle={styles.starCont} disabled={true} maxStars={5} starSize={20} rating={item.stars} fullStarColor='#fe9605' />
                                        </nb.Body>
                                        <nb.Right>
                                            <nb.Text note>{moment(item.timeStamp).fromNow()}</nb.Text>
                                        </nb.Right>
                                    </nb.ListItem>
                                )
                            }}
                        />
                    </nb.List>
                </nb.Content>
            </View>
        )
    }
}
export default ReviewScreen;