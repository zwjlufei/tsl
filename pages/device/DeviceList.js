import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    FlatList,
    TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import Header from "../CommonModules/Header";
import Loading from "../CommonModules/Loading";
import px2dp from "../tools/px2dp";
import Icon from "react-native-vector-icons/Feather";
import {Toast,feach_request} from '../tools/public';
export default class DeviceList extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            modalVisible:false,
            deviceList:[],
            device:null
        }
    }
    componentDidMount(){
        const type = this.props.navigation.state.params.msg.class;
        this.requestDevice(type);
    }
    //数据列表请求
    requestDevice(type){
        feach_request(`/device/?device_class=${type}`,'GET')
            .then((data)=>{
                console.log('list',data)
                if(data.code==0){
                    this.setState({
                        deviceList:data.data
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('出现未知错误，信息无法提交～');
            })
    }
    //渲染列表
    renderRow(roeData,index){
        return(
            <TouchableOpacity onPress={()=>{
                this.setState({
                    modalVisible:true,
                    device:roeData
                })
            }}>
                <View style={styles.item_wrap}>
                    <Icon name="video" size={22} color="#32bbff" />
                    <Text style={styles.item_wrap_font}>{roeData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render(){
        const { navigate } = this.props.navigation;
        const msg = this.props.navigation.state.params.msg;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={msg.display} navigate={this.props.navigation}/>
                {/*<Loading loading={this.state.loading}/>*/}
                {
                    this.state.deviceList.length==0?(
                        <Text>暂无数据</Text>
                    ):(
                        <FlatList
                            data={this.state.deviceList}
                            renderItem={({item,index}) => this.renderRow(item,index)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )
                }
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
                                {
                                    msg.method.map((item,index)=>{
                                        return(
                                            <TouchableWithoutFeedback key={index} onPress={()=>{
                                                this.setState({
                                                    modalVisible: false
                                                });
                                                item=='live'?navigate('LiveVideo',{device:this.state.device,method:item}):navigate('VodVideo',{device:this.state.device,method:item});
                                            }}>
                                                <View style={styles.modal_btn}>
                                                    <Text style={styles.modal_btn_font}>{item=='live'?'实时流':'点播'}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                                <TouchableWithoutFeedback onPress={()=>{
                                    this.setState({
                                        modalVisible: false
                                    })
                                }}>
                                    <View style={[styles.modal_btn,styles.back_btn]}>
                                        <Text style={[styles.modal_btn_font,styles.back_btn_font]}>返回上一步</Text>
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
    item_wrap:{
        padding:px2dp(15),
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:px2dp(1),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_wrap_font:{
        fontSize:px2dp(15),
        color:'#333',
        marginLeft:px2dp(15)
    },
    modal_mask  :{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info_wrap:{
        width:px2dp(250),
        height:px2dp(270),
        backgroundColor:'#fff',
        borderRadius:px2dp(10),
        alignItems:'center',
        paddingTop:px2dp(40)
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
        marginTop:px2dp(20)
    },
    back_btn_font:{
        color:'#66b3ff'
    }
});