import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    FlatList,
    TouchableOpacity
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
            refresh:false
        }
        this.renderRow=this.renderRow.bind(this);
    }
    //跳转到详情页
    goDetail(rowData){
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
                    <Text style={styles.msg_type}>消息类型：{rowData.type}</Text>
                    <Text style={[styles.msg_title,rowData.type==4?styles.red_color:'',rowData.has_read?styles.has_read:'']} numberOfLines={1}>{rowData.subject}</Text>
                    <Text style={styles.msg_time}>{rowData.datetime}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    //请求数据
    _request(callBack,page){
        feach_request(`/message/list?pagenum=${page}&pagesize=10`,'GET')
            .then((data)=>{
                console.log('list',data)
                if(data.code==0){
                    this.setState({
                        loading:false
                    });
                    callBack(data.list)
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('出现未知错误，信息无法提交～');
            })
    }
    //下拉刷新
    refresh=(callBack)=>{
        this._request(callBack,1)
    }
    //上拉加载
    loadMore=(page,callback)=>{
        this._request(callback,page)
    };
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'消息列表'} navigate={this.props.navigation} left={true}/>
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
    }
});