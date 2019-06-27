import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList, Image
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
var {width,height} = Dimensions.get('window');
import {feach_request, Toast} from "../tools/public";
import Loading from "../CommonModules/Loading";
export default class OaList extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            type:'own',
            listData:[],
            loading:true
        }
    }
    componentDidMount(){
        this._request(this.state.type);
    }
    //tab切换
    changeTab(type){
        this.setState({
            type:type
        })
        this._request(type);
    }
    //请求数据
    _request(type){
        feach_request(`/activity/${type}`,'GET')
            .then((data)=>{
                console.log('list',data)
                if(data.code==0){
                    this.setState({
                        loading:false,
                        listData:data.data
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络错误～');
            })
    };
    //跳转详情页
    goDetail(rowData){
        if(rowData.template=='EventProcess'){
            this.props.navigation.navigate('EventProcess',{msg:rowData,source:this.state.type})
        }else {
            alert('暂无对应模版')
        }
    }
    //列表渲染
    renderRow=(rowData,index)=>{
        return(
            <TouchableOpacity onPress={()=>{this.goDetail(rowData)}}>
                <View style={styles.list_item_wrap}>
                    <Text style={styles.oa_title}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'事务列表'} navigate={this.props.navigation}/>
                <View style={[styles.flex_space_between,styles.type_tap_wrap]}>
                    <TouchableWithoutFeedback onPress={()=>this.changeTab('own')}>
                        <View style={[styles.flex,styles.type_tap]}>
                            <View style={this.state.type=='own'?styles.bottom_border:''}>
                                <Text style={[styles.type_tap_font,this.state.type=='own'?styles.blue_font:'']}>发起事务</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.type_wall}></View>
                    <TouchableWithoutFeedback onPress={()=>this.changeTab('jobs')}>
                        <View style={[styles.flex,styles.type_tap]}>
                            <View style={this.state.type=='jobs'?styles.bottom_border:''}>
                                <Text style={[styles.type_tap_font,this.state.type=='jobs'?styles.blue_font:'']}>待办事务</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Loading loading={this.state.loading}/>
                {
                    this.state.listData.length==0?(
                        <View style={{flex:1,alignItems:'center',backgroundColor:'#fff'}}>
                            <Image
                                style={{width: 300,height:200,marginTop:px2dp(100)}}
                                source={require('./../../images/empty_list.png')}
                            />
                            <Text style={styles.no_msg}>暂时还没有数据哦～</Text>
                        </View>
                    ):(
                        <FlatList
                            data={this.state.listData}
                            renderItem={({item,index}) => this.renderRow(item,index)}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={false}
                            onRefresh={()=>this._request(this.state.type)}
                        />
                    )
                }

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
    type_tap_wrap:{
        height:px2dp(50),
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#e0e0e0',
        backgroundColor:'#fff'
    },
    type_tap: {
       justifyContent: 'center',
        alignItems: 'center'
    },
    type_tap_font:{
        fontSize:px2dp(15)
    },
    type_wall:{
        width:px2dp(1),
        height:px2dp(25),
        backgroundColor: '#e0e0e0'
    },
    blue_font:{
        color:'#32bbff'
    },
    bottom_border:{
        borderBottomWidth: px2dp(1),
        borderBottomColor: '#32bbff',
        height:px2dp(50),
        paddingHorizontal:px2dp(20),
        justifyContent:'center'
    },
    list_item_wrap:{
        paddingVertical:px2dp(20),
        paddingHorizontal: px2dp(15),
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#e0e0e0'
    },
    oa_title:{
        fontSize: px2dp(15)
    },
    no_msg:{
        fontSize:px2dp(14),
        textAlign: 'center',
        paddingTop:px2dp(30)
    }
});