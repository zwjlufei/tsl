import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert
} from 'react-native';
import Header from "../CommonModules/Header";
export default class VisitorPackage extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            hospital:'',
            modalVisible:false,
            msg: ''
        }
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Text>邀请访客</Text>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    flex:{
        flex:1
    },
    flex_space_between:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    }
});