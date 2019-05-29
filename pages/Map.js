import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import {WebView} from "react-native-webview";
import Header from "./CommonModules/Header";
import px2dp from "./tools/px2dp";
export default class Map extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            hospital:'',
            modalVisible:false,
            msg: '',
            videoShow:false,
            paused:false
        }
    }
    render(){
        const { navigate } = this.props.navigation;
        const run = `
        true;
        `;
        // setTimeout(() => {
        //     this.webview.injectJavaScript(run);
        // }, 3000);
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'物业管理'} navigate={this.props.navigation} left={true}/>
                <WebView  source={{uri: 'http://192.168.21.123:88/'}}
                                   javaScriptEnabled={true}
                                   startInLoadingState={true}
                                   useWebKit={true}
                                   ref={(webview) => {
                                       this.webview = webview;
                                   }}
                                   onMessage={(event) => {
                                       // alert(event.nativeEvent.data)
                                       this.setState({
                                           modalVisible:true,
                                           msg: event.nativeEvent.data
                                       })
                                   }}
                                   renderError={() => {
                                       console.log('出错了')
                                   }}
                    />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}>
                    <View style={styles.modal_mask}>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.setState({
                                modalVisible: false
                            })
                        }}>
                            <View style={styles.info_wrap}>
                                <Text>{this.state.msg}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
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
    },
    modal_mask:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info_wrap:{
        width:px2dp(250),
        height:px2dp(300),
        backgroundColor:'#ffffff',
        borderRadius:px2dp(10)
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});