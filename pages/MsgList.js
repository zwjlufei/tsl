import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import Header from "./CommonModules/Header";
import PageListView from 'react-native-page-listview';
import px2dp from "./tools/px2dp";
import {Toast,feach_request} from './tools/public';
import Loading from './CommonModules/Loading';
export default class MsgList extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            listData:[],
            loading:true,
            refresh:false,
            type:true
        }
        this.renderRow=this.renderRow.bind(this);
    }
    //跳转到详情页
    goDetail(rowData){
        console.log('rowData',rowData)
        rowData.has_read=true;
        this.setState({
            refresh:true
        });
        this.props.navigation.navigate('MsgDetail',{mId:rowData.mId})
    }
    //列表渲染
    renderRow=(rowData,index)=>{
        return(
            <TouchableOpacity onPress={()=>{this.goDetail(rowData)}}>
                <View style={styles.list_item_wrap}>
                    <Text style={styles.msg_type}>消息类型：{rowData.type==4?'紧急重要':(rowData.type==3?'紧急不重要':(rowData.type==2?'不紧急重要':'不紧急不重要'))}</Text>
                    <Text style={[styles.msg_title,rowData.type==4||rowData.type==3?styles.red_color:'',rowData.has_read?styles.has_read:'']} numberOfLines={1}>{rowData.subject}</Text>
                    <Text style={styles.msg_time}>{rowData.datetime}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    //请求数据
    _request(source,callBack,type){
        feach_request(`/message/list?pageNum=1&pageSize=10&noread=${type}&all=true`,'GET')
            .then((data)=>{
                console.log(data)
                if(data.code==0){
                    this.setState({
                        loading:false
                    });
                    if(source=='init'){
                        callBack(data.list)
                    }else {
                        this.PL.manualRefresh(data.list);
                    }

                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    }
    //下拉刷新
    refresh=(callBack)=>{
        this._request('init',callBack,this.state.type)
    }
    //上拉加载
    loadMore=(page,callback)=>{
        feach_request(`/message/list?pageNum=${page}&pageSize=10&noread=${this.state.type}&all=true`,'GET')
            .then((data)=>{
                console.log(data)
                if(data.code==0){
                    this.setState({
                        loading:false
                    });
                    callback(data.list)
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    };
    //tab切换
    changeTab(type){
        this.setState({
            type:type
        })
        this._request('change','',type)
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'消息列表'} navigate={this.props.navigation} left={true}/>
                <View style={styles.tab_wrap}>
                    <TouchableWithoutFeedback onPress={()=>{this.changeTab(true)}}>
                        <View style={[styles.tab_btn,this.state.type?styles.bottom_border:'']}>
                            <Text style={[styles.tab_btn_font,this.state.type?styles.blue_font:'']}>未读</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.gap_line}></View>
                    <TouchableWithoutFeedback onPress={()=>{this.changeTab(false)}}>
                        <View style={[styles.tab_btn,this.state.type?'':styles.bottom_border]}>
                            <Text style={[styles.tab_btn_font,this.state.type?'':styles.blue_font]}>全部</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
        height:px2dp(100),
        padding:px2dp(15),
        justifyContent: 'space-between',
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#F0F0F0'
    },
    msg_type:{
        fontSize:px2dp(13),
        color:'#666'
    },
    msg_title:{
        fontSize: px2dp(15)
    },
    msg_time:{
        fontSize:px2dp(12),
        color: '#8F8F94'
    },
    red_color:{
        color:'red'
    },
    has_read:{
        opacity:0.5
    },
    tab_wrap:{
        height: px2dp(50),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal:px2dp(30),
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:px2dp(1)
    },
    tab_btn:{
        height: px2dp(50),
        paddingHorizontal:px2dp(30),
        justifyContent:'center',
        alignItems:'center'
    },
    tab_btn_font:{
        fontSize:px2dp(15),
        letterSpacing:px2dp(2)
    },
    bottom_border:{
        borderBottomWidth: px2dp(1),
        borderBottomColor: '#32bbff'
    },
    blue_font:{
        color:'#32bbff'
    },
    gap_line: {
        width:px2dp(1),
        height:px2dp(25),
        backgroundColor:'#e0e0e0'
    }
});