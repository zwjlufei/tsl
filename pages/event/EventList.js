import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    FlatList,
    TouchableWithoutFeedback, Image, ScrollView
} from 'react-native';
import Header from "../CommonModules/Header";
import PageListView from 'react-native-page-listview';
import px2dp from "../tools/px2dp";
import {Toast,feach_request} from '../tools/public';
import Loading from '../CommonModules/Loading';
import constant from "../tools/constant";
export default class EventList extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            listData:[],
            loading:true,
            refresh:false
        }
        this.renderRow=this.renderRow.bind(this);
    }
    //跳转到详情页
    goDetail(rowData){
        // this.props.navigation.navigate('MsgDetail',{mId:rowData.mId})
    }
    //列表渲染
    renderRow=(rowData,index)=>{
        return(
            <TouchableWithoutFeedback onPress={()=>{this.goDetail(rowData)}}>
                <View style={styles.list_item_wrap}>
                    <View style={{flex:5,paddingRight:px2dp(10)}}>
                        <Text style={[styles.msg_title,styles.line_25]} numberOfLines={1}>{rowData.person?'rowData.person.name':''}{rowData.hint?rowData.hint:'无'}</Text>
                        <View style={styles.img_wrap}>
                            {
                                rowData.avatar?(
                                    <Image
                                        style={[styles.img_style,styles.mr_15]}
                                        source={{uri: `${ constant.url}${rowData.avatar}`}}
                                    />
                                ):(null)
                            }
                            {
                                rowData.picture?(
                                    <Image
                                        style={styles.img_style}
                                        source={{uri: `${ constant.url}${rowData.picture}`}}
                                    />
                                ):(null)
                            }
                        </View>
                        <View style={styles.img_wrap}>
                            <Text style={[styles.msg_time,styles.line_25,styles.mr_15]}>{rowData.event_class==0?'陌生人消息':(rowData.event_class==1?'出行消息':(rowData.event_class==3?'布控消息':'部库消息'))}</Text>
                            <Text style={[styles.msg_time,styles.line_25]}>{rowData.book_time}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,paddingTop:px2dp(15)}}>
                        <View style={[styles.state_wrap,rowData.act_id?styles.deal_state:'']}>
                            <Text style={{fontSize:px2dp(14),color: '#fff'}}>{rowData.act_id?'处理中':'未处理'}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    //请求数据
    _request(callBack,page){
        feach_request(`/event/list?pagenum=${page}&pagesize=10`,'GET')
            .then((data)=>{
                if(data.code==0){
                    this.setState({
                        loading:false
                    });
                    callBack(data.data)
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    };
    //下拉刷新
    refresh=(callBack)=>{
        this._request(callBack,1)
    };
    //上拉加载
    loadMore=(page,callback)=>{
        this._request(callback,page)
    };
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'报警事件'} navigate={this.props.navigation}/>
                <Loading loading={this.state.loading}/>
                <PageListView
                    pageLen={10}
                    renderRow={this.renderRow}
                    refresh={this.refresh}
                    loadMore={this.loadMore}
                    ref={(r)=>{!this.PL&&(this.PL=r)}}
                />
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
    list_item_wrap:{
        padding:px2dp(15),
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#F0F0F0',
        flexDirection:'row'
    },
    msg_title:{
        fontSize: px2dp(15),
        color:'#333',
        marginBottom: px2dp(15)
    },
    msg_time:{
        fontSize:px2dp(12),
        color: '#8F8F94'
    },
    img_wrap:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    line_25:{
        lineHeight:px2dp(25)
    },
    img_style:{
        width: 60,
        height:60,
        borderRadius:5,
        marginBottom:px2dp(10)
    },
    mr_15:{
        marginRight: px2dp(15)
    },
    state_wrap:{
        height: px2dp(30),
        borderRadius: px2dp(5),
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'red'
    },
    deal_state:{
        backgroundColor: '#0f882f'
    }
});