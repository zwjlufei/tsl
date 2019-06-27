import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    ScrollView
} from 'react-native';
import Header from "../CommonModules/Header";
import Loading from "../CommonModules/Loading";
import {feach_request, Toast} from "../tools/public";
import px2dp from "../tools/px2dp";
export default class PersonDetail extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            detailData:{}
        }
    }
    componentDidMount(){
        const pId = this.props.navigation.state.params.pId;
        feach_request(`person/detail?pid=${pId}`,'GET')
            .then((data)=>{
                console.log('list',data)
                if(data.code==0){
                    this.setState({
                        detailData:data.data
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
                <Header title={this.state.detailData.name?this.state.detailData.name:'人员资料'} navigate={this.props.navigation}/>
                <ScrollView style={styles.flex}>
                    <View style={{padding:px2dp(15)}}>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>姓名:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.name}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>别名:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.alias?this.state.detailData.alias:'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>性别:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.gender?(this.state.detailData.gender==1?'男':(this.state.detailData.gender==2?'女':'未知')):'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>籍贯:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.household_registration?this.state.detailData.household_registration:'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>身份证号:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.SID?this.state.detailData.SID:'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>户籍地址:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.SID_address?this.state.detailData.SID_address:'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>常住地:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.resident_addres?this.state.detailData.resident_addres:'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>工作地址:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.working_institution?this.state.detailData.working_institution:'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>联系方式:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.contract?this.state.detailData.contract:'无'}</Text>
                        </View>
                        <View style={styles.msg_item}>
                            <Text style={styles.msg_title}>标签:</Text>
                            <Text style={styles.msg_content}>{this.state.detailData.tags?this.state.detailData.tags:'无'}</Text>
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
    msg_title:{
        fontSize:px2dp(14),
        color:'#333',
        flex:1
    },
    msg_content:{
        fontSize: px2dp(13),
        flex:4
    },
    msg_item:{
        flexDirection: 'row',
        alignItems:'center',
        paddingVertical:px2dp(10)
    }
});