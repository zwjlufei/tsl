import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert, Dimensions,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import Header from "./CommonModules/Header";
import px2dp from "./tools/px2dp";
import Icon from "react-native-vector-icons/Feather";
import {feach_request, Toast} from "./tools/public";
var {width,height} = Dimensions.get('window');
export default class ModuleCollect extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            device:[]
        }
    }
    componentDidMount(){
        feach_request(`/device/`,'GET')
            .then((data)=>{
                if(data.code==0){
                    this.setState({
                        device:data.data
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络异常～');
            })
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'功能列表'} navigate={this.props.navigation} left={true}/>
                <ScrollView>
                    <View style={{padding:px2dp(15)}}>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>物业管理</Text>
                            </View>
                            <View style={styles.row_line}>
                                <TouchableWithoutFeedback onPress={()=>{navigate('CallNum')}}>
                                    <View style={styles.module_item_wrap}>
                                        <View style={styles.module_item}>
                                            <Icon name="phone-call" size={25} color="#ffffff" />
                                        </View>
                                        <Text style={styles.module_item_title}>呼叫物业</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>人员管理</Text>
                            </View>
                            <View style={styles.row_line}>
                                <TouchableWithoutFeedback onPress={()=>{navigate('PeopleSearch')}}>
                                    <View style={styles.module_item_wrap}>
                                        <View style={styles.module_item}>
                                            <Icon name="users" size={25} color="#ffffff" />
                                        </View>
                                        <Text style={styles.module_item_title}>人员搜索</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={styles.row_line}>
                                    <TouchableWithoutFeedback onPress={()=>{navigate('StrangerList')}}>
                                        <View style={styles.module_item_wrap}>
                                            <View style={styles.module_item}>
                                                <Icon name="bell" size={25} color="#ffffff" />
                                            </View>
                                            <Text style={styles.module_item_title}>陌生人</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.row_line}>
                                    <TouchableWithoutFeedback onPress={()=>{navigate('PictureSearch')}}>
                                        <View style={styles.module_item_wrap}>
                                            <View style={styles.module_item}>
                                                <Icon name="camera" size={25} color="#ffffff" />
                                            </View>
                                            <Text style={styles.module_item_title}>以图搜人</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>考勤查询</Text>
                            </View>
                            <View style={styles.row_line}>
                                <TouchableWithoutFeedback onPress={()=>{navigate('PrivatAttendance')}}>
                                    <View style={styles.module_item_wrap}>
                                        <View style={styles.module_item}>
                                            <Icon name="pie-chart" size={25} color="#ffffff" />
                                        </View>
                                        <Text style={styles.module_item_title}>个人考勤</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>感知</Text>
                            </View>
                            <View style={styles.row_line}>
                                {
                                    this.state.device.map((item,index)=>{
                                        return(
                                                <TouchableWithoutFeedback key={index} onPress={()=>{navigate('DeviceList',{msg:item})}}>
                                                <View style={styles.module_item_wrap}>
                                                    <View style={styles.module_item}>
                                                        <Icon name="video" size={25} color="#ffffff" />
                                                    </View>
                                                    <Text style={styles.module_item_title}>{item.display}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>事务</Text>
                            </View>
                            <View style={styles.row_line}>
                                <TouchableWithoutFeedback onPress={()=>{navigate('OaList')}}>
                                    <View style={styles.module_item_wrap}>
                                        <View style={styles.module_item}>
                                            <Icon name="file-text" size={25} color="#ffffff" />
                                        </View>
                                        <Text style={styles.module_item_title}>事件管理</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>统计</Text>
                            </View>
                            <View style={styles.row_line}>
                                <TouchableWithoutFeedback onPress={()=>{navigate('StatisticsSimple')}}>
                                    <View style={styles.module_item_wrap}>
                                        <View style={styles.module_item}>
                                            <Icon name="database" size={25} color="#ffffff" />
                                        </View>
                                        <Text style={styles.module_item_title}>统计</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>租户</Text>
                            </View>
                            <View style={styles.row_line}>
                                <TouchableWithoutFeedback onPress={()=>{navigate('TenementApply')}}>
                                {/*<TouchableWithoutFeedback onPress={()=>{navigate('SmartHouse')}}>*/}
                                    <View style={styles.module_item_wrap}>
                                        <View style={styles.module_item}>
                                            <Icon name="edit" size={25} color="#ffffff" />
                                        </View>
                                        <Text style={styles.module_item_title}>自主申报</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{marginBottom:px2dp(30)}}>
                            <View>
                                <Text style={styles.module_title}>设置</Text>
                            </View>
                            <View style={styles.row_line}>
                                <TouchableWithoutFeedback onPress={()=>{navigate('SettingPage')}}>
                                    <View style={styles.module_item_wrap}>
                                        <View style={styles.module_item}>
                                            <Icon name="settings" size={25} color="#ffffff" />
                                        </View>
                                        <Text style={styles.module_item_title}>设置</Text>
                                    </View>
                                </TouchableWithoutFeedback>
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
    row_line:{
        flexDirection: 'row',
        alignItems:'center'
    },
    module_item_wrap:{
        flexDirection: 'column',
        alignItems:'center',
        marginRight:px2dp(16)
    },
    module_item:{
        width:px2dp(55),
        height:px2dp(55),
        borderRadius:px2dp(10),
        backgroundColor: '#32bbff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: px2dp(5)
    },
    module_title:{
        fontSize:px2dp(18),
        marginBottom:px2dp(10),
        color:'#333'
    },
    module_item_title:{
        fontSize: px2dp(13),
        letterSpacing: px2dp(1)
    }
});