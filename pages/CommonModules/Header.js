//顶部导航
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    TouchableWithoutFeedback, Image
} from 'react-native';
var {width,height} = Dimensions.get('window');
import px2dp from './../tools/px2dp';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-navigation';
export default class Header extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            title:''
        }
    }
    componentDidMount(){
        this.setState({
            title:this.props.title
        })
    }
    goBack(){
        if(this.props.jump){
            this.props.navigate.navigate('App',{selectedTab:this.props.jump});
        }else {
            this.props.navigate.goBack();

        }
    }
    rightBtn(){
        return(
            <View style={[styles.flex,styles.pr_17]}></View>
        )
    }
    leftBtn(){
        const navigate =  this.props.navigate;
        if(this.props.left){
            return(
                <View style={[styles.flex,styles.pl_17]}></View>
            )
        }else{
            return(
                <TouchableWithoutFeedback onPress={()=>{this.goBack()}}>
                    <View style={[styles.flex,styles.pl_17]}>
                        <Icon name="angle-left" size={30} color="#333" />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
    render(){
        return(
            <SafeAreaView style={styles.header_wrap} >
                <StatusBar backgroundColor={'#f8f8f8'} barStyle={'dark-content'}/>
                <View style={styles.headerBox}>
                    {this.leftBtn()}
                    <View style={{flex:2,flexDirection:'row',justifyContent: 'center'}}>
                        <Text style={styles.title_style}>{this.state.title}</Text>
                    </View>
                    {this.rightBtn()}
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    flex:{
        flex: 1
    },
    headerBox:{
        width:width,
        height:px2dp(50),
        backgroundColor:'#f8f8f8',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    title_style:{
        fontSize:px2dp(16),
        color:'#333',
        fontWeight: '600',
        letterSpacing: px2dp(2)
    },
    right_style:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems: 'center',
        paddingTop: px2dp(5)
    },
    pl_17:{
        paddingLeft: px2dp(17)
    },
    header_wrap:{
        backgroundColor: '#f8f8f8'
    },
    pr_17:{
        paddingRight:px2dp(17)
    }
});