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
import QrcodePackage from './pass/QrcodePackage';
import px2dp from "./tools/px2dp";
var {width,height} = Dimensions.get('window');
import Icon from "react-native-vector-icons/AntDesign";
export default class PassPage extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            pageShow:'ble'
        }
    }
    //tab切换
    changeTab(page){
        this.setState({
            pageShow:page
        })
    }
    //页面显示
    pageShow(){
        if(this.state.pageShow=='ble'){
            return(
                <BlePackage />
            )
        }else if(this.state.pageShow=='qrcode'){
            return(
                <QrcodePackage />
            )
        }else {
            return(
                <VisitorPackage />
            )
        }
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'通行'} navigate={this.props.navigation} left={true}/>
                <View style={[styles.flex_space_between,styles.tab_wrap]}>
                    <TouchableWithoutFeedback onPress={()=>{this.changeTab('ble')}}>
                    <View style={styles.tab_item}>
                        <Icon name="key" size={28} color="#32bbff" />
                        <Text style={styles.tab_font}>我的钥匙</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.gap_line}></View>
                    <TouchableWithoutFeedback onPress={()=>{this.changeTab('qrcode')}}>
                    <View style={styles.tab_item}>
                        <Icon name="qrcode" size={28} color="#32bbff" />
                        <Text style={styles.tab_font}>二维码</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.gap_line}></View>
                    <TouchableWithoutFeedback onPress={()=>{this.changeTab('visitor')}}>
                    <View style={styles.tab_item}>
                        <Icon name="addusergroup" size={28} color="#32bbff" />
                        <Text style={styles.tab_font}>邀请好友</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.pageShow()}
            </View>

        )
    }
}
const styles = StyleSheet.create({
    tab_item:{
        flex:1,
        alignItems:'center',
        paddingVertical:px2dp(20)
    },
    flex_space_between:{
        flexDirection: 'row',
        alignItems:'center'
    },
    tab_font:{
        marginTop:px2dp(10)
    },
    tab_wrap:{
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#e0e0e0'
    },
    gap_line:{
        width:px2dp(1),
        height:px2dp(35),
        backgroundColor:'#e0e0e0'
    }
});