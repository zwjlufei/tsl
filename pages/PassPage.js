import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback, PermissionsAndroid
} from 'react-native';
import Header from "./CommonModules/Header";
import BlePackage from './pass/BlePackage';
import VisitorPackage from './pass/VisitorPackage';
import px2dp from "./tools/px2dp";
var {width,height} = Dimensions.get('window');
export default class PassPage extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            bleShow:true
        }
    }
    //搜索钥匙
    searchKey(){
        this.setState({
            bleShow:true
        })
    }
    //邀请访客
    inviteVisitor(){
        this.setState({
            bleShow:false
        })
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'通行'} navigate={this.props.navigation} left={true}/>
                {
                    this.state.bleShow?(
                        <BlePackage />
                    ):(
                        <VisitorPackage />
                    )
                }
                <View style={[styles.flex_space_between,styles.btn_wrap]}>
                    <TouchableWithoutFeedback onPress={()=>{this.searchKey()}}>
                        <View style={styles.bottom_btn}>
                            <Text style={styles.btn_font}>搜索钥匙</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.inviteVisitor()}}>
                        <View style={styles.bottom_btn}>
                            <Text style={styles.btn_font}>邀请访客</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
    btn_wrap:{
        width:width,
        paddingHorizontal:px2dp(15),
        position:'absolute',
        bottom:px2dp(25)
    },
    bottom_btn:{
        width:px2dp(150),
        height:px2dp(45),
        backgroundColor: '#66b3ff',
        borderRadius:px2dp(10)
    },
    btn_font:{
        lineHeight:px2dp(45),
        textAlign: 'center',
        fontSize:px2dp(18),
        color: '#fff',
        letterSpacing: px2dp(1)
    }
});