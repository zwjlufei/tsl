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
import {WebView} from "react-native-webview";
import Loading from "../CommonModules/Loading";
import constant from "../tools/constant";
export default class NewsDetail extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
    }
    render(){
        const mId = this.props.navigation.state.params.mId;
        console.log(`${constant.url}/news/${mId}/`)
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'公告详情'} navigate={this.props.navigation}/>
                <WebView  source={{uri: `${constant.url}/news/${mId}/`}}
                          javaScriptEnabled={true}
                          startInLoadingState={true}
                          renderLoading={() => <Loading />}
                          useWebKit={true}
                          ref={(webview) => {
                              this.webview = webview;
                          }}
                />
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