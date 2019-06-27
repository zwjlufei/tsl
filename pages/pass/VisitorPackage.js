import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Dimensions,
    Image,
    TouchableWithoutFeedback, ImageBackground
} from 'react-native';
var {width,height} = Dimensions.get('window');
import * as WeChat from 'react-native-wechat';
import {Toast} from "../tools/public";
import px2dp from "../tools/px2dp";
export default class VisitorPackage extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            code:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559290466592&di=bc863f588b37daf0aa3a64b0c8129d1f&imgtype=0&src=http%3A%2F%2Fi2.sinaimg.cn%2Fdy%2Fc%2F2014-07-18%2F1405623657_VbFlfN.jpg'
        }
    }
    componentDidMount(){
        WeChat.registerApp('wx9c05340a4de743b8');
    }
    shareFriends(){
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        type: 'imageUrl',
                        title: 'web image',
                        description: 'share web image to time line',
                        mediaTagName: 'email signature',
                        messageAction: undefined,
                        messageExt: undefined,
                        imageUrl: this.state.code
                    })
                        .catch((error) => {
                            console.log(error.message);
                        });
                } else {
                        Toast('没有安装微信软件，请您安装微信之后再试');
                }
            });
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc',alignItems: 'center'}}>
                <View style={styles.code_wrap}>
                    <ImageBackground source={require("./../../images/code_bg.png")} style={{width: '100%',height: '100%'}}>
                        <View style={{alignItems: 'center'}}>
                            <Image
                                style={styles.code_img}
                                source={{uri: this.state.code}}
                            />
                            {/*<Text style={styles.hint_font}>请在支持二维码通行扫描的设备下使用</Text>*/}
                            <View style={styles.flex_center}>
                                <TouchableWithoutFeedback onPress={()=>{this.shareFriends()}}>
                                    <View style={styles.share_btn}>
                                        <Text style={styles.share_font}>分享给好友</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    flex:{
        flex:1
    },
    flex_center:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    share_btn:{
        width: width*0.5,
        height: px2dp(45),
        backgroundColor: '#32bbff',
        borderRadius:px2dp(10),
        marginTop:px2dp(50)
    },
    share_font:{
        lineHeight:px2dp(45),
        textAlign: 'center',
        fontSize:px2dp(18),
        color: '#fff',
        letterSpacing: px2dp(2)
    },
    code_img:{
        width: px2dp(200),
        height:px2dp(200),
        marginTop:px2dp(90)
    },
    code_wrap:{
        width:width*0.8,
        height:width*1.15,
        marginTop: px2dp(15)
    },
    hint_font:{
        fontSize: px2dp(12),
        marginTop:px2dp(110)
    }
});