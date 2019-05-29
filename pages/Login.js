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
    TouchableWithoutFeedback, StatusBar
} from 'react-native';
var {width,height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import px2dp from './tools/px2dp';
import Icon from "react-native-vector-icons/FontAwesome";
import {Toast,feach_request} from './tools/public';
import AsyncStorage from '@react-native-community/async-storage';
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
            feach_request('/login?username=zhangsan&password=123','GET')
                .then((data)=>{
                    console.log(data)
                    if(data.code==0){
                        AsyncStorage.setItem('isLogin',data.data);
                        this.props.navigation.navigate('App')
                    }
                })
                .catch((err)=>{
                    Toast('请检查用户名和密码的正确性～')
                })

        // }

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
    }
});