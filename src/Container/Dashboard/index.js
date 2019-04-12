import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { connect } from "react-redux"

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageUrl: '',

        }
    } 
    componentWillMount(){
        console.log(this.props.navigation.state.params.userInfo, '///////');
        // this.setState({
        //     name: this.props.navigation.state.params.name,
        //     imageUrl: this.props.navigation.state.params.picture.data.url
        // })
    }
   
    render(){
        return(
            <View style={{alignItems: 'center', justifyContent: 'center'}} >
                <StatusBar hidden={true} />

                <Text>Dashboard</Text>
                {/* <Image source={{uri: this.state.imageUrl}} style={{width: 150, height: 150, borderRadius: 50, marginVertical: 20}} />
                <Text>
                    {this.state.name}
                </Text> */}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.AuthReducer.isLoading,
        validation: state.AuthReducer.validation,
        route: state.AuthReducer.route,
    };
}

export default connect(mapStateToProps, {})(Dashboard);