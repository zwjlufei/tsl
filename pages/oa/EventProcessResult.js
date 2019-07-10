import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback, Image
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import {feach_request, Toast,getStorage} from "../tools/public";
import constant from '../tools/constant';
export default class EventProcessResult extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            msgData:{},
            msg:{},
            userInfo:{}
        }
    }
    componentDidMount(){
        let msg = this.props.navigation.state.params.msg;
        getStorage('userInfo')
            .then(data=>{
                this.setState({
                    userInfo:data
                })
            }).catch(err=>{
            console.log(err)
        });
        feach_request(`/activity/query?act_id=${msg.act_id}`,'GET')
            .then((data)=>{
                console.log('data',data)
                if(data.code==0){
                    this.setState({
                        msgData:data.data.data,
                        msg:msg,
                        ack:data.data.ack
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    }
    render(){
        let msg = this.props.navigation.state.params.msg;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'处理结果'} navigate={this.props.navigation}/>
                <ScrollView style={styles.flex}>
                    <View style={styles.padding_15}>
                        {
                            this.state.msgData.avatar?(
                                <Image
                                    style={{width: 150,height:150,marginBottom:px2dp(10)}}
                                    source={{uri: `${ constant.url}${this.state.msgData.avatar}`}}
                                />
                            ):(null)
                        }
                        <View style={styles.msg_wrap}>
                            <Text style={styles.msg_title}>消息主题:</Text>
                            <Text style={[styles.msg_content]}>{this.state.msgData.hint?this.state.msgData.hint:'无'}</Text>
                        </View>
                        <View style={styles.msg_wrap}>
                            <Text style={styles.msg_title}>消息类型:</Text>
                            <Text style={styles.msg_content}>{this.state.msgData.event_class==0?'陌生人消息':(this.state.msgData.event_class==1?'出行消息':(this.state.msgData.event_class==3?'布控消息':'部库消息'))}</Text>
                        </View>
                        <View style={styles.msg_wrap}>
                            <Text style={styles.msg_title}>开始时间:</Text>
                            <Text style={styles.msg_content}>{this.state.msgData.event_time}</Text>
                        </View>
                        <View style={styles.msg_wrap}>
                            <Text style={styles.msg_title}>截止时间:</Text>
                            <Text style={styles.msg_content}>{this.state.msgData.dead_time}</Text>
                        </View>
                        <View style={styles.mt_20}>
                            <TextInput multiline = {true} style={styles.input_style} value={this.state.ack?this.state.ack:'无'} editable={false}
                                       onChangeText={(text) => this.setState({offer:text})}/>
                        </View>
                    </View>
                </ScrollView>
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
        justifyContent: 'space-around',
        alignItems:'center'
    },
    padding_15:{
        padding:px2dp(15)
    },
    msg_wrap:{
        flexDirection: 'row',
        paddingVertical:px2dp(8)
    },
    msg_title:{
        fontSize:px2dp(15),
        color:'#333',
        flex:1,
        marginRight:px2dp(15)
    },
    msg_content:{
        fontSize:px2dp(14),
        lineHeight:px2dp(20),
        flex:4
    },
    input_style:{
        height: px2dp(100),
        borderWidth:px2dp(1),
        borderColor:'#e0e0e0',
        borderRadius:px2dp(5),
        textAlignVertical: 'top',
        padding: px2dp(10),
        color:'#666'
    },
    submit_btn:{
        flex:1,
        height:px2dp(45),
        borderRadius: px2dp(40),
        backgroundColor: '#32bbff',
        marginTop:px2dp(20),
        justifyContent: 'center',
        alignItems:'center',
        marginHorizontal:px2dp(10)
    },
    submit_btn_font:{
        color: '#fff',
        fontSize:px2dp(15),
        letterSpacing:px2dp(2)
    },
    mt_20:{
        marginTop: px2dp(20)
    },
    gray_bg:{
        backgroundColor:'#fff',
        borderWidth: px2dp(1),
        borderColor: '#32bbff'
    },
    blue_color:{
        color:'#32bbff'
    },
    flex_center:{
        justifyContent: 'center',
        alignItems:'center'
    }
});