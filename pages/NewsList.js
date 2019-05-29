import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal, TouchableOpacity, Image, ScrollView
} from 'react-native';
import Header from "./CommonModules/Header";
import {Toast,feach_request} from './tools/public';
import PageListView from 'react-native-page-listview';
import Loading from "./CommonModules/Loading";
import px2dp from "./tools/px2dp";
export default class NewsList extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            refresh:false
        }
    }
    //跳转到详情页
    goDetail(rowData){
        this.props.navigation.navigate('NewsDetail',{mId:rowData.mId})
    }
    //列表渲染
    renderRow=(rowData,index)=>{
        return(
            <TouchableOpacity onPress={()=>{this.goDetail(rowData)}}>
                <View style={styles.list_item_wrap}>
                    <View style={styles.flex_row}>
                        <Image
                            style={{width: 20,height:20}}
                            source={require("./../images/remind_icon.png")}
                        />
                        <Text style={styles.msg_title} numberOfLines={1}>{rowData.subject}</Text>
                    </View>
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
                <Header title={'公告列表'} navigate={this.props.navigation} left={true}/>
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
    flex_row:{
        flexDirection:'row',
        alignItems: 'center'
    },
    list_item_wrap:{
        height:px2dp(80),
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
        fontSize: px2dp(15),
        marginLeft:px2dp(10),
        color:'#333'
    },
    msg_time:{
        fontSize:px2dp(12),
        color: '#8F8F94'
    },
});