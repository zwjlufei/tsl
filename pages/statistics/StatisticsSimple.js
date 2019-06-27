import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Image,
    ScrollView
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import {feach_request, Toast} from "../tools/public";
export default class StatisticsSimple extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={
            msg:{}
        }
    }
    componentDidMount(){
        feach_request(`/statistics/simple`,'GET')
            .then((data)=>{
                if(data.code==0){
                    this.setState({
                        msg:data.data
                    })
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
                <Header title={'统计列表'} navigate={this.props.navigation}/>
                <ScrollView style={styles.flex}>
                    <View style={[styles.p_15]}>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/person_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>人员总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.person_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/building_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>建筑总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.building_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/avatar_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>人像总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.avatar_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/room_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>房间总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.room_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/facepicture_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>人脸抓拍总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.facepicture_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/device_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>设备总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.device_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/avatarevent_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>人像事件报警总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.avatarevent_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/autopasscategroy_coun.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>车牌总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.autopasscategroy_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/stranger_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>陌生人总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.stranger_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/runningactivity_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>正在进行的事务总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.runningactivity_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 55,height:50}}
                                source={require("../../images/fmbc_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>人脸微卡口总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.fmbc_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/ambc_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>车辆微卡口总数</Text>
                                <Text style={styles.item_number}>{this.state.msg.ambc_count}</Text>
                            </View>
                        </View>
                        <View style={[styles.flex_space_between,styles.item_wrap]}>
                            <Image
                                style={{width: 50,height:50}}
                                source={require("../../images/ipc_count.png")}
                            />
                            <View>
                                <Text style={styles.item_title}>摄像机数量</Text>
                                <Text style={styles.item_number}>{this.state.msg.ipc_count}</Text>
                            </View>
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
        justifyContent: 'space-between',
        alignItems:'center'
    },
    p_15:{
        padding:px2dp(15)
    },
    item_wrap:{
        paddingVertical:px2dp(20),
        paddingHorizontal:px2dp(25),
        elevation: 3,
        backgroundColor:'#fff',
        shadowColor:'#333',
        shadowOffset:{h:5,w:0},
        shadowRadius:2,
        shadowOpacity:0.3,
        marginBottom:px2dp(15),
        borderRadius:px2dp(5)
    },
    item_title:{
        fontSize:px2dp(16),
        letterSpacing:px2dp(1),
        marginBottom: px2dp(10)
    },
    item_number:{
        fontSize: px2dp(20),
        color:'#333',
        textAlign: 'right'
    }
});