import React, {Component} from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet, Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class OaDetail extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {
        const isLogin = await AsyncStorage.getItem('isLogin');
        this.props.navigation.navigate(isLogin ? 'App' : 'Login',{selectedTab:'MsgList'});
        // this.props.navigation.navigate(true ? 'App' : 'Login');
    };
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <ActivityIndicator />
            </View>
        )
    }
}