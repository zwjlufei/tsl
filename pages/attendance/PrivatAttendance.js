import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TouchableWithoutFeedback, TouchableOpacity, FlatList
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import Icon from "react-native-vector-icons/AntDesign";
import Picker from "react-native-picker";
import Loading from "../CommonModules/Loading";
import {feach_request, Toast,getDays} from "../tools/public";
var selectData = [];
let date = new Date();
export default class PrivatAttendance extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            year:date.getFullYear()+'年',
            month:date.getMonth() + 1+'月',
            allDays:[],
            loading:true
        }
    }
    componentDidMount(){
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        this.requestData(year,month);
    }
    componentWillUnmount(){
        Picker.hide();
    }
    //数据请求
    requestData(year,month){
        let days = getDays(year,month);
        var daysArr=[];
        for(let i=0;i<days;i++){
            var j=i+1;
            daysArr.push({
                date:year+'-'+(month<10?'0'+month:month)+'-'+(j<10?'0'+j:j),
                enter_time:null,
                leave_time:null
            })
        }
        var newArr = daysArr;
        // var newArr = this.state.allDays;
        feach_request(`/attence/my?year=${year}&month=${month}`,'GET')
            .then((data)=>{
                if(data.code==0 && data.data.length>0){
                    for(let i=0;i<newArr.length;i++){
                        for(let j=0;j<data.data.length;j++){
                            if(newArr[i].date==data.data[j].date){
                                newArr[i]=data.data[j]
                            }
                        }
                    }
                }
                this.setState({
                    allDays:newArr,
                    loading:false
                })
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络异常～');
            })
    }
    _createDateData() {
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let maxY = y + 10;
        let minY = y - 10;
        let data = [
            [],
            ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        ]
        for(let i = minY;i <= maxY;i++){
            data[0].push(i+'年');
        }
        selectData = [y+'年',m+'月']
        return data;
    }
    //显示日期插件
    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            selectedValue:selectData,
            pickerFontColor: [51, 51 ,51, 1],
            pickerTitleText:'年月选择',
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            onPickerConfirm: (pickedValue) => {
                this.setState({
                    year:pickedValue[0],
                    month:pickedValue[1]
                });
                let year = pickedValue[0].substring(0,4);
                let month = pickedValue[1].substring(0,1);
                this.setState({
                    loading:true
                });
                this.requestData(year,month);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }
    //列表渲染
    renderRow=(rowData,index)=>{
        return(
            <View style={[styles.flex_row_center,styles.item_wrap]}>
                <View style={styles.flex}>
                    <Text style={styles.title_font}>{rowData.date}</Text>
                </View>
                <View style={[styles.flex,styles.mark_center]}>
                    {
                        rowData.enter_time?(
                            <Text style={styles.title_font}>{rowData.enter_time}</Text>
                        ):(
                            <View style={styles.yellow_mark}></View>
                        )
                    }
                </View>
                <View style={[styles.flex,styles.mark_center]}>
                    {
                        rowData.enter_time?(
                            <Text style={styles.title_font}>{rowData.leave_time}</Text>
                        ):(
                            <View style={styles.yellow_mark}></View>
                        )
                    }
                </View>
            </View>
        );
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'考勤详情'} navigate={this.props.navigation}/>
                <View style={[styles.flex_space_between,styles.date_wrap]}>
                    <TouchableWithoutFeedback onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.flex_row_center}>
                            <Text style={styles.date_font}>{this.state.year}{this.state.month}</Text>
                            <Icon name="calendar" size={26} color="#32bbff"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.flex_row_center}>
                        <View style={styles.yellow_mark}></View>
                        <Text>缺卡</Text>
                    </View>
                </View>
                <View style={[styles.flex_row_center,styles.title_wrap]}>
                    <View style={styles.flex}>
                        <Text style={styles.title_font}>日期</Text>
                    </View>
                    <View style={styles.flex}>
                        <Text style={styles.title_font}>上班时间</Text>
                    </View>
                    <View style={styles.flex}>
                        <Text style={styles.title_font}>下班时间</Text>
                    </View>
                </View>
                <Loading loading={this.state.loading}/>
                <FlatList
                    data={this.state.allDays}
                    renderItem={({item,index}) => this.renderRow(item,index)}
                    keyExtractor={(item, index) => index.toString()}
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
        justifyContent:'space-between',
        alignItems:'center'
    },
    flex_row_center:{
        flexDirection: 'row',
        alignItems:'center'
    },
    title_wrap:{
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#e0e0e0'
    },
    title_font:{
        textAlign: 'center',
        fontSize:px2dp(14),
        color:'#333',
        lineHeight:px2dp(40)
    },
    date_font:{
        fontSize: px2dp(15),
        color: '#333',
        marginRight:px2dp(20)
    },
    date_wrap:{
        padding:px2dp(15)
    },
    item_wrap:{
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#e0e0e0'
    },
    yellow_mark:{
        width:px2dp(10),
        height:px2dp(10),
        borderRadius:px2dp(10),
        backgroundColor: '#ffc602',
        marginRight: px2dp(10)
    },
    mark_center:{
        alignItems: 'center'
    }
});