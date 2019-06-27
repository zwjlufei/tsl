import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    Keyboard, Image, Dimensions
} from 'react-native';
import Header from "../CommonModules/Header";
import Icon from "react-native-vector-icons/Ionicons";
import px2dp from "../tools/px2dp";
import Loading from "../CommonModules/Loading";
import {feach_request, Toast} from "../tools/public";
export default class PeopleSearch extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            refresh:false,
            emptyShow:true,
            key:'',
            listData:[]
        }
    }

    //人员搜索
    searchPerson(){
        if(this.state.key){
            this.setState({
                emptyShow:false
            })
            feach_request(`/person/search?key=${this.state.key}`,'GET')
                .then((data)=>{
                    console.log('list',data)
                    if(data.code==0){
                        if(data.data.length>0){
                            this.setState({
                                loading:false,
                                listData:data.data
                            });
                        }else {
                            this.setState({
                                emptyShow:true
                            })
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    Toast('网络错误～');
                })
        }else {
            Toast('请输入关键词')
        }
        Keyboard.dismiss();
    }
    //列表渲染
    renderRow=(rowData,index)=>{
        return(
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PersonDetail',{pId:rowData.id})}}>
                <View style={styles.list_item_wrap}>
                    <View style={styles.msg_item}>
                        <Text style={styles.msg_title}>姓名:</Text>
                        <Text style={styles.msg_content}>{rowData.name}</Text>
                    </View>
                    <View style={styles.msg_item}>
                        <Text style={styles.msg_title}>手机号:</Text>
                        <Text style={styles.msg_content}>{rowData.contract}</Text>
                    </View>
                    <View style={styles.msg_item}>
                        <Text style={styles.msg_title}>居住地:</Text>
                        <Text style={styles.msg_content}>{rowData.resident_address?rowData.resident_address:'无'}</Text>
                    </View>
                    <View style={styles.msg_item}>
                        <Text style={styles.msg_title}>工作单位:</Text>
                        <Text style={styles.msg_content}>{rowData.working_institution?rowData.working_institution:'无'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'人员搜索'} navigate={this.props.navigation}/>
                <View style={styles.search_wrap}>
                    <TextInput placeholder={'请输入关键词'} style={[styles.search_input]} onChangeText={(text)=>{this.setState({key:text})}} onSubmitEditing={()=>{this.searchPerson()}}/>
                    <TouchableWithoutFeedback onPress={()=>{this.searchPerson()}}>
                        <View style={styles.search_btn_wrap}>
                            <View style={styles.search_btn}>
                                <Icon name="ios-search" size={26} color="#fff"/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {
                    this.state.emptyShow?(
                        <View style={{flex:1,alignItems:'center',backgroundColor:'#fff'}}>
                            <Image
                                style={{width: 300,height:200,marginTop:px2dp(100)}}
                                source={require('./../../images/empty_list.png')}
                            />
                            <Text style={styles.warn_font}>暂时还没有数据哦～</Text>
                        </View>
                    ):(
                        <View style={styles.flex}>
                            <Loading loading={this.state.loading}/>
                            <FlatList
                                data={this.state.listData}
                                renderItem={({item,index}) => this.renderRow(item,index)}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
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
    search_wrap:{
        flexDirection: 'row',
        alignItems: 'center',
        padding:px2dp(15),
        elevation: 3,
        backgroundColor:'#fff',
        shadowColor:'#333',
        shadowOffset:{h:5,w:0},
        shadowRadius:2,
        shadowOpacity:0.3
    },
    search_input:{
        flex:4,
        borderWidth:px2dp(1),
        borderColor:'#e0e0e0',
        height:px2dp(40),
        paddingLeft:px2dp(15),
        borderRadius:px2dp(5),
        marginRight:px2dp(10)
    },
    search_btn_wrap:{
        flex:1,
        paddingLeft: px2dp(10)
    },
    search_btn:{
        flex:1,
        height:px2dp(40),
        backgroundColor:'#32bbff',
        borderRadius:px2dp(5),
        alignItems:'center',
        justifyContent: 'center'
    },
    list_item_wrap:{
        padding: px2dp(15),
        borderBottomColor:'#e0e0e0',
        borderBottomWidth:px2dp(1)
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
        paddingVertical:px2dp(2)
    },
    warn_font:{
        fontSize:px2dp(13),
        marginTop: px2dp(10)
    }
});