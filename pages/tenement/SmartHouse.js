import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Image,
    ScrollView,
    BackHandler,
    TouchableWithoutFeedback
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import {feach_request, Toast} from "../tools/public";
import Icon from "react-native-vector-icons/Entypo";
export default class SmartHouse extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={
            msg:{}
        }
    }
    componentDidMount() {
        console.log(this.props.navigation);
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('App',{selectedTab:'ModuleCollect'}); // works best when the goBack is async
            return true;
        });
        // let url = this.props.navigation.state.params.msg;
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'智慧房屋'} navigate={this.props.navigation} jump={'ModuleCollect'}/>
                <ScrollView>
                    <View style={styles.address_wrap}>
                        <Text style={styles.house_address}>昌平区东三旗村133号1楼103室</Text>
                        <View style={styles.flex_row_center}>
                            <Icon name="location-pin" size={20} color="#fff"/>
                            <Text style={styles.house_village}>昌平区东三旗村村委会</Text>
                        </View>
                    </View>
                    <View style={styles.p_15}>
                        <Text>公安便民</Text>
                        <View style={styles.info_files_wrap}>
                            <TouchableWithoutFeedback onPress={()=>{navigate('InfoSubmit')}}>
                                <View style={{alignItems:'center'}}>
                                    <Icon name="new-message" size={25} color="#32bbff"/>
                                    <Text style={styles.hint_font}>租户资料提交</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.login_btn}>
                    <Text style={styles.login_btn_font}>房东登录</Text>
                </View>
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
    address_wrap:{
        height:px2dp(120),
        backgroundColor: '#32bbff',
        paddingVertical:px2dp(25),
        paddingHorizontal:px2dp(20)
    },
    flex_row_center:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    house_address:{
        color:'#fff',
        fontSize:px2dp(16),
        marginBottom:px2dp(10)
    },
    house_village:{
        color:'#fff',
        fontSize:px2dp(14)
    },
    login_btn:{
        height: px2dp(45),
        backgroundColor:'#32bbff'
    },
    login_btn_font:{
        color:'#fff',
        fontSize:px2dp(16),
        textAlign: 'center',
        lineHeight:px2dp(45),
        letterSpacing:px2dp(2)
    },
    p_15:{
        padding:px2dp(15)
    },
    info_files_wrap :{
        borderStyle:'dashed',
        borderWidth:px2dp(1),
        borderColor:'#e0e0e0',
        height:px2dp(200),
        borderRadius:px2dp(5),
        marginTop:px2dp(15),
        justifyContent: 'center',
        alignItems:'center'
    },
    hint_font:{
        marginTop: px2dp(10),
        fontSize:px2dp(13)
    }
});