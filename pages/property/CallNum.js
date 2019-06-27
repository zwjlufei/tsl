import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TouchableWithoutFeedback,
    Linking
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import Icon from "react-native-vector-icons/Feather";
export default class CallNum extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'呼叫物业'} navigate={this.props.navigation}/>
                <TouchableWithoutFeedback onPress={()=>{Linking.openURL('tel:10086')}}>
                    <View style={styles.call_wrap}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.call_font,styles.mr_10]}>公司物业</Text>
                            <Text style={styles.call_font}>13567789900</Text>
                        </View>
                        <Icon name="phone-outgoing" size={22} color="#666" />
                    </View>
                </TouchableWithoutFeedback>
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
    call_wrap:{
        borderBottomColor:'#e0e0e0',
        borderBottomWidth: px2dp(1),
        padding:px2dp(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    call_font:{
        fontSize:px2dp(16)
    },
    mr_10:{
        marginRight:px2dp(10)
    }
});