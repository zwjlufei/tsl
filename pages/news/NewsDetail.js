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
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'公告详情'} navigate={this.props.navigation}/>
                {/*<Loading loading={this.state.loading}/>*/}
                <WebView  source={{uri: 'https://mp.weixin.qq.com/s/kMVBBPJTqhmIwzkoINQQFQ'}}
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