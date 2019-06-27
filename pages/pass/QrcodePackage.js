import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';
var {width,height} = Dimensions.get('window');
import px2dp from "../tools/px2dp";
export default class QrcodePackage extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            code:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559290466592&di=bc863f588b37daf0aa3a64b0c8129d1f&imgtype=0&src=http%3A%2F%2Fi2.sinaimg.cn%2Fdy%2Fc%2F2014-07-18%2F1405623657_VbFlfN.jpg'
        }
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
                            <Text style={styles.hint_font}>请在支持二维码通行扫描的设备下使用</Text>
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
        justifyContent: 'center',
        alignItems:'center'
    },
    code_img:{
        width: px2dp(200),
        height:px2dp(200),
        marginTop:px2dp(100)
    },
    code_wrap:{
        width:width*0.8,
        height:width*1.15,
        marginTop: px2dp(15)
    },
    hint_font:{
        fontSize: px2dp(12),
        marginTop:px2dp(50)
    }
});