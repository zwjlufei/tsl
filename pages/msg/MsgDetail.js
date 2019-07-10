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
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
var {width,height} = Dimensions.get('window');
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import {feach_request, Toast} from "../tools/public";
import Loading from '../CommonModules/Loading';
import constant from '../tools/constant';
export default class MsgDetail extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            detailData:{},
            loading:true
        }
    }
    componentDidMount(){
        const mId = this.props.navigation.state.params.mId;
        feach_request(`/message/detail?mId=${mId}`,'GET')
            .then((data)=>{
                console.log('detail',data)
                if(data.code==0){
                    this.setState({
                        detailData:data.data,
                        loading:false
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    }
    hasRead(){
        const mId = this.props.navigation.state.params.mId;
        feach_request(`/message/msgread?mId=${mId}`,'GET')
            .then((data)=>{
                console.log('detail',data)
                if(data.code==0){
                    Toast('提交成功～');
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    }
    //处理事务
    manageOa(){
        feach_request(`/activity/get?act_id=${this.state.detailData.oaId}`,'GET')
            .then((data)=>{
                if(data.code==0){
                    if(data.data.program=='EventProcess'){
                        this.props.navigation.navigate('EventProcess',{msg:data.data})
                    }else if(rowData.program=='EventProcessResult'){
                        this.props.navigation.navigate('EventProcessResult',{msg:rowData})
                    }{
                        alert('暂无对应模版')
                    }
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
                <Header title={'消息详情'} navigate={this.props.navigation}/>
                <Loading loading={this.state.loading}/>
                <ScrollView>
                    {
                        this.state.detailData.image?(
                            <View style={{padding: px2dp(15)}}>
                                <Image
                                    style={{width: 200,height:200}}
                                    source={{uri: `${constant.url}${this.state.detailData.image}`}}
                                />
                            </View>
                        ):(null)
                    }
                    <View>
                        <View style={[styles.flex_row,styles.msg_wrap]}>
                            <Text style={styles.msg_title}>消息主题:</Text>
                            <Text style={styles.msg_info}>{this.state.detailData.subject}</Text>
                        </View>
                        <View style={[styles.flex_row,styles.msg_wrap]}>
                            <Text style={styles.msg_title}>消息类型:</Text>
                            <Text style={styles.msg_info}>{this.state.detailData.type}</Text>
                        </View>
                        <View style={[styles.msg_wrap]}>
                            <Text style={styles.msg_title}>消息详情:</Text>
                            {/*<Text style={styles.msg_info}>{this.state.detailData.detail}</Text>*/}
                            <Text style={[styles.msg_info,styles.msg_detail]}>{this.state.detailData.detail}</Text>
                        </View>
                        <View style={[styles.flex_row,styles.msg_wrap]}>
                            <Text style={styles.msg_title}>预警时间:</Text>
                            <Text style={styles.msg_info}>{this.state.detailData.datetime}</Text>
                        </View>
                    </View>
                </ScrollView>
                {
                    this.state.detailData.oaId?(
                        <TouchableWithoutFeedback onPress={()=>{this.manageOa()}}>
                            <View style={{alignItems: 'center',marginBottom:px2dp(30)}}>
                                <View style={styles.affirm_btn}>
                                    <Text style={styles.affirm_btn_font}>处理事物</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ):(
                        <TouchableWithoutFeedback onPress={()=>{this.hasRead()}}>
                            <View style={{alignItems: 'center',marginBottom:px2dp(30)}}>
                                <View style={styles.affirm_btn}>
                                    <Text style={styles.affirm_btn_font}>我知道了</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }

            </View>


        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fcfcfc'
    },
    flex:{
        flex:1
    },
    flex_row:{
        flexDirection:'row',
        alignItems: 'center'
    },
    msg_wrap:{
        padding:px2dp(15)
    },
    msg_title:{
        flex:1,
        fontSize:px2dp(17),
        color:'#333'
    },
    msg_info:{
        flex:3,
        fontSize: px2dp(15),
        color:'#666',
        lineHeight: px2dp(25)
    },
    affirm_btn:{
        width:px2dp(300),
        height:px2dp(45),
        backgroundColor: '#66b3ff',
        borderRadius:px2dp(10)
    },
    affirm_btn_font:{
        lineHeight:px2dp(45),
        textAlign: 'center',
        fontSize:px2dp(18),
        color: '#fff',
        letterSpacing: px2dp(2)
    },
    msg_detail:{
        marginTop:px2dp(5),
        letterSpacing: px2dp(1)
    }
});