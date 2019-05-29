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
                Toast('出现未知错误，信息无法提交～');
            })
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'消息详情'} navigate={this.props.navigation}/>
                <Loading loading={this.state.loading}/>
                <ScrollView>
                    {/*{*/}
                        {/*this.state.detailData.image?(*/}
                            {/*<Image*/}
                                {/*style={{width: width,height:200}}*/}
                                {/*source={{uri: this.state.detailData.image}}*/}
                            {/*/>*/}
                        {/*):(null)*/}
                    {/*}*/}
                    <Image
                        style={{width: width,height:200}}
                        source={{uri: 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/pic/item/38dbb6fd5266d016a764897b9a2bd40735fa3567.jpg'}}
                    />
                    <View>
                        <View style={[styles.flex_row,styles.msg_wrap,styles.mt_20]}>
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
                <TouchableWithoutFeedback onPress={()=>{navigate('OaDetail')}}>
                    <View style={{alignItems: 'center',marginBottom:px2dp(30)}}>
                        <View style={styles.affirm_btn}>
                            <Text style={styles.affirm_btn_font}>处理事务</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
    mt_20:{
        marginTop:px2dp(20)
    },
    msg_detail:{
        marginTop:px2dp(5),
        letterSpacing: px2dp(1)
    }
});