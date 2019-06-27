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
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import {feach_request, getStorage, Toast} from "../tools/public";
import AsyncStorage from '@react-native-community/async-storage';
export default class SettingPage extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state= {
            role: '无',
            userInfo:{}
        }
    }
    componentDidMount(){
        getStorage('userInfo')
            .then(userInfo=>{
                feach_request(`/user_role/list`,'GET')
                    .then((data)=>{
                        if(data.code==0){
                            data.data.map((item,index)=>{
                                if(userInfo.role==item.name){
                                    this.setState({role:item.display,userInfo:userInfo})
                                }
                            })
                        }
                    })
                    .catch((err)=>{
                        console.log(err);
                        Toast('网络错误～');
                    })
            }).catch(err=>{
            console.log(err)
        });
    }
    //退出登录
    logout(){
        feach_request(`/user/logout`,'GET')
            .then((data)=>{
                if(data.code==0){
                    let keys = ["isLogin", "userInfo"];
                    AsyncStorage.multiRemove(keys, err => {
                        // 如果k1,k2字段值存在的话就会被删除
                        Toast('退出登录～');
                        this.props.navigation.navigate('Login');
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'设置'} navigate={this.props.navigation}/>
                <View style={styles.item_wrap}>
                    <Text style={styles.title}>当前登录账号:</Text>
                    <Text style={styles.content}>{this.state.userInfo.user_display}</Text>
                </View>
                <View style={styles.item_wrap}>
                    <Text style={styles.title}>角色名称:</Text>
                    <Text style={styles.content}>{this.state.role}</Text>
                </View>
                <View style={styles.item_gap}></View>
                <View style={styles.item_wrap}>
                    <Text style={styles.title}>版本信息:</Text>
                    <Text style={styles.content}>版本1.0.0</Text>
                </View>
                <TouchableWithoutFeedback onPress={()=>{this.logout()}}>
                    <View style={{justifyContent: 'center',alignItems:'center'}}>
                        <View style={styles.exit_btn}>
                            <Text style={styles.exit_btn_font}>退出登录</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
    item_wrap:{
        flexDirection: 'row',
        alignItems: 'center',
        height:px2dp(50),
        borderBottomWidth: px2dp(1),
        borderBottomColor:'#efefef',
        paddingHorizontal: px2dp(17)
    },
    title:{
        flex:1,
        lineHeight:px2dp(48),
        fontSize:px2dp(16),
        color:'#4b4b4b'
    },
    content:{
        flex:2,
        lineHeight:px2dp(48),
        marginLeft:px2dp(17),
        fontSize:px2dp(16),
        color:'#4b4b4b'
    },
    item_gap:{
        height:px2dp(5),
        backgroundColor: '#efefef'
    },
    exit_btn:{
        width:px2dp(280),
        height:px2dp(45),
        backgroundColor:'#32bbff',
        borderRadius:px2dp(5),
        marginTop:px2dp(150)
    },
    exit_btn_font:{
        fontSize:px2dp(17),
        color:'#fff',
        textAlign: 'center',
        lineHeight:px2dp(45),
        letterSpacing:px2dp(2)
    }
});