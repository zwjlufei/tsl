import React, {Component} from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Image,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback, StatusBar, BackHandler
} from 'react-native';
var {width,height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import px2dp from './tools/px2dp';
import Icon from "react-native-vector-icons/FontAwesome";
import {Toast,feach_request} from './tools/public';
import AsyncStorage from '@react-native-community/async-storage';
import Alipay from '@0x5e/react-native-alipay';
export default class Login extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            name:'',
            pwd:''
        }
    }
    goLogin(){
        // if(this.state.name&&this.state.pwd){
            feach_request(`/login?username=${this.state.name}&password=${this.state.pwd}`,'GET')
                .then((data)=>{
                    console.log(data)
                    if(data.code==0){
                        AsyncStorage.setItem('isLogin',data.data);
                        this.props.navigation.navigate('App',{selectedTab:'MsgList'})
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    Toast('请检查用户名和密码的正确性～')
                })
        // }else {
        //     Toast('请检查信息完整性～')
        // }
    }
    componentDidMount() {
        if(Platform.OS === "android"){
            BackHandler.addEventListener('hardwareBackPress',
                this.onBackButtonPressAndroid);
        }
    }

    componentWillUnmount() {
        if(Platform.OS === "android"){
            BackHandler.removeEventListener('hardwareBackPress',
                this.onBackButtonPressAndroid);
        }
    }
    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                this.props.navigation.goBack();
                return false;
            }
            this.lastBackPressed = Date.now();
            Toast('再按一次退出应用');
            return true;
        }
    }
    //支付宝登录
    async goAlipay(){
        try {
            let infoStr = 'apiname=com.alipay.account.auth&method=alipay.open.auth.sdk.code.get&app_id=xxxx&app_name=mc&biz_type=openservice&pid=xxxx&product_id=APP_FAST_LOGIN&scope=kuaijie&target_id=xxxx&auth_type=AUTHACCOUNT&sign_type=RSA2&sign=xxxx'; // get from server, signed
            let response = await Alipay.authWithInfo(infoStr);
            console.info(response);

            // let { resultStatus, result, memo } = response;
            // let { success, result_code, auth_code, user_id } = QueryString.parse(result);
        } catch (error) {
            console.error(error);
        }
    }
    render(){
        return(
            <View style={{flex:1,marginTop:(Platform.OS === 'ios' ? 20 : 0)}}>
                <StatusBar backgroundColor={'#32bbff'}/>
                <ScrollView>
                    <LinearGradient  colors={['#96ebff','#32bbff']} style={styles.linearGradient}>
                        <Image
                            source={require('./../images/tsl_logo.jpg')}
                            style={{width:px2dp(70),height:px2dp(70),borderRadius:px2dp(35)}}
                        />
                        <Text style={styles.login_title}>警务APP</Text>
                    </LinearGradient>
                    <View style={styles.input_wrap}>
                        <View style={styles.icon_wrap}>
                            <Icon name="user-circle-o" size={28} color="#32bbff" />
                        </View>
                        <TextInput
                            style={styles.input_style}
                            onChangeText={(text) => this.setState({name:text})}
                            placeholder={'请输入用户名'}
                        />
                    </View>
                    <View style={styles.input_wrap}>
                        <View style={styles.icon_wrap}>
                            <Icon name="lock" size={30} color="#32bbff"/>
                        </View>
                        <TextInput
                            style={styles.input_style}
                            onChangeText={(text) => this.setState({pwd:text})}
                            placeholder={'请输入密码'}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{this.goLogin()}}>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.login_btn}>
                                <Text style={styles.login_btn_font}>登录</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {/*<View>*/}
                        {/*<View style={styles.wechat_icon}>*/}
                            {/*<Icon name="user-circle-o" size={28} color="#32bbff" />*/}
                        {/*</View>*/}
                        {/*<View style={styles.alipay_icon}>*/}
                            {/*<Icon name="user-circle-o" size={28} color="#32bbff" />*/}
                        {/*</View>*/}
                    {/*</View>*/}
                </ScrollView>
            </View>

        )
    }

}
const styles = StyleSheet.create({
    flex:{
        flex:1
    },
    input_wrap:{
        flexDirection: 'row',
        alignItems:'center',
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#f0f0f0',
        paddingHorizontal:px2dp(20)
    },
    linearGradient:{
        width:width,
        paddingTop:px2dp(80),
        paddingBottom:px2dp(50),
        alignItems: 'center'
    },
    login_title:{
        fontSize:px2dp(20),
        marginTop: px2dp(10),
        color:'#FFFFFF',
        letterSpacing: px2dp(1)
    },
    input_style:{
        flex:1,
        height:px2dp(80),
        fontSize: px2dp(16)
    },
    icon_wrap:{
        width:px2dp(50),
        alignItems:'center'
    },
    login_btn:{
        width:px2dp(300),
        height:px2dp(45),
        borderRadius: px2dp(40),
        backgroundColor:'#32bbff',
        alignItems:'center',
        justifyContent:'center',
        marginTop:px2dp(40)
    },
    login_btn_font:{
        color: '#ffffff',
        fontSize:px2dp(18),
        letterSpacing: px2dp(2)
    },
    wechat_icon:{

    },
    alipay_icon:{

    }
});