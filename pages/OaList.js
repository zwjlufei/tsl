import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert, Dimensions
} from 'react-native';
import Header from "./CommonModules/Header";
import Video from 'react-native-video';
import px2dp from "./tools/px2dp";
var {width,height} = Dimensions.get('window');
export default class OaList extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {

        }

    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'事务列表'} navigate={this.props.navigation} left={true}/>
                <Text>事务列表</Text>
                {/*http://192.168.11.88:8080/live/livestream.flv*/}
                <Video
                    ref='videoPlayer' //设置组件类型，类似于input的type
                    source={{uri:Platform.OS === "ios" ?'http://192.168.11.88:8080/live/livestream.m3u8':'http://192.168.11.88:8080/live/livestream.flv'}} //视频地址
                    style={styles.video} //视频样式
                    volume={1}
                    paused={true}
                    controls={true}
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
    },
    video: {
        width:width,
        height:px2dp(211)
    },
});