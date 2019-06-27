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
    TouchableWithoutFeedback, Image, TextInput
} from 'react-native';
import Header from "../CommonModules/Header";
import PageListView from 'react-native-page-listview';
import px2dp from "../tools/px2dp";
import {Toast,feach_request} from '../tools/public';
import Loading from '../CommonModules/Loading';
import constant from "../tools/constant";
import Icon from "react-native-vector-icons/Feather";
export default class StrangerList extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            listData:[],
            loading:true,
            refresh:false,
            type:false,
            modalVisible: false,
            name:'',
            mId:''
        }
        this.renderRow=this.renderRow.bind(this);
    }
    componentWillUnmount(){
        this.setState({
            modalVisible: false
        })
    }
    //列表渲染
    renderRow=(rowData,index)=>{
        return(
            <View style={styles.list_item_wrap}>
                <View>
                    <Image
                        style={{width: 100,height:100,borderRadius:px2dp(10)}}
                        source={{uri: `${constant.url}${rowData.avatar}`}}
                    />
                    {
                        this.state.type?(null):(
                            <Text style={styles.msg_alias}>别名:{rowData.alias?rowData.alias:'无'}</Text>
                        )
                    }
                    <Text style={styles.msg_time}>报警时间:{rowData.book_time}</Text>
                </View>
                {
                    this.state.type?(
                        <TouchableWithoutFeedback onPress={()=>{
                            this.setState({
                                modalVisible: true,
                                mId:rowData.avatar_id
                            })
                        }}>
                            <View style={styles.control_btn}>
                                <Text style={styles.control_btn_font}>升级</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ):(
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigation.navigate('PersonDetail',{pId:rowData.person_id})
                        }}>
                            <View style={styles.control_btn}>
                                <Text style={styles.control_btn_font}>详情</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }

            </View>
        );
    }
    //请求数据
    _request(source,callBack,type){
        feach_request(`/stranger/list?pageNum=1&pageSize=10&new=${type}`,'GET')
            .then((data)=>{
                console.log(data)
                if(data.code==0){
                    this.setState({
                        loading:false
                    });
                    if(source=='init'){
                        callBack(data.data)
                    }else {
                        this.PL.manualRefresh(data.data);
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
        feach_request(`/stranger/list?pageNum=1&pageSize=10&new=${this.state.type}`,'GET')
            .then((data)=>{
                console.log(data)
                if(data.code==0){
                    this.setState({
                        loading:false
                    });
                    callback(data.data)
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
    //提交信息
    submitMsg(){
        if(this.state.name){
            feach_request(`/stranger/upgrade?aid=${this.state.mId}&alias=${this.state.name}`,'GET')
                .then((data)=>{
                    if(data.code==0){
                        feach_request(`/person_surveillance/add?pid=${this.state.mId}`,'GET')
                            .then((data)=>{
                                console.log('这里',data)
                                if(data.code==0){
                                    Toast('提交成功～');
                                    this.setState({
                                        modalVisible: false
                                    })
                                }else {
                                    Toast('提交失败～');
                                }
                            })
                            .catch((err)=>{
                                console.log(err);
                                Toast('网络错误～');
                            })
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    Toast('网络错误～');
                })
        }else {
            Toast('请输入别名～');
        }

    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'陌生人列表'} navigate={this.props.navigation}/>
                <View style={styles.tab_wrap}>
                    <TouchableWithoutFeedback onPress={()=>{this.changeTab(false)}}>
                        <View style={[styles.tab_btn,!this.state.type?styles.bottom_border:'']}>
                            <Text style={[styles.tab_btn_font,!this.state.type?styles.blue_font:'']}>已报警</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.gap_line}></View>
                    <TouchableWithoutFeedback onPress={()=>{this.changeTab(true)}}>
                        <View style={[styles.tab_btn,this.state.type?styles.bottom_border:'']}>
                            <Text style={[styles.tab_btn_font,this.state.type?styles.blue_font:'']}>未报警</Text>
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}>
                    <View style={styles.modal_mask}>
                        <View style={styles.info_wrap}>
                            <Text style={styles.modal_title}>添加别名</Text>
                            <TouchableWithoutFeedback onPress={()=>{
                                this.setState({
                                    modalVisible: false
                                })
                            }}>
                                <View style={styles.icon_wrap}>
                                    <Icon name="x-circle" size={26} color="#bdc1bb"/>
                                </View>
                            </TouchableWithoutFeedback>
                            <TextInput
                                style={styles.input_style}
                                onChangeText={(text) => this.setState({name:text})}
                                placeholder={'请输入别名'}
                            />
                            <TouchableWithoutFeedback onPress={()=>{this.submitMsg()}}>
                                <View style={[styles.modal_btn,styles.back_btn]}>
                                    <Text style={[styles.modal_btn_font,styles.back_btn_font]}>提交</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>
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
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    msg_type:{
        fontSize:px2dp(13),
        color:'#666'
    },
    msg_title:{
        fontSize: px2dp(15)
    },
    msg_time:{
        fontSize:px2dp(14),
        color: '#8F8F94',
        marginTop:px2dp(5)
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
    },
    control_btn:{
        width:px2dp(80),
        height:px2dp(40),
        borderRadius: px2dp(5),
        backgroundColor:'#32bbff',
        marginTop: px2dp(25)
    },
    control_btn_font:{
        textAlign: 'center',
        lineHeight:px2dp(40),
        color:'#fff',
        fontSize:px2dp(15),
        letterSpacing: px2dp(2)
    },
    modal_mask  :{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info_wrap:{
        width:px2dp(250),
        height:px2dp(210),
        backgroundColor:'#fff',
        borderRadius:px2dp(10),
        alignItems:'center',
        paddingTop:px2dp(20)
    },
    modal_btn:{
        width: px2dp(200),
        height: px2dp(40),
        backgroundColor:'#66b3ff',
        borderRadius: px2dp(5),
        marginBottom:px2dp(30),
        elevation: 3,
        shadowColor:'#333',
        shadowOffset:{h:5,w:0},
        shadowRadius:2,
        shadowOpacity:0.3
    },
    modal_btn_font:{
        fontSize: px2dp(16),
        color: '#fff',
        textAlign:'center',
        lineHeight:px2dp(40)
    },
    mb_40:{
        marginBottom:px2dp(50)
    },
    back_btn:{
        backgroundColor:'#fff',
        marginTop:px2dp(25)
    },
    back_btn_font:{
        color:'#66b3ff'
    },
    input_style:{
        borderColor:'#e0e0e0',
        borderWidth:px2dp(1),
        borderRadius:px2dp(5),
        width: px2dp(200),
        height: px2dp(40),
        marginTop:px2dp(30),
        paddingLeft:px2dp(15),
        paddingVertical:px2dp(5)
    },
    modal_title:{
        fontSize:px2dp(18)
    },
    icon_wrap:{
        width:px2dp(60),
        height:px2dp(60),
        position:'absolute',
        right:0,
        top:0,
        justifyContent:'center',
        alignItems:'center'
    },
    msg_alias:{
        fontSize:px2dp(15),
        color: '#333',
        marginTop:px2dp(5)
    }
});