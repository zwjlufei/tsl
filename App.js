/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,BackHandler} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import MsgList from './pages/MsgList';
import ModuleCollect from './pages/ModuleCollect';
import PassPage from './pages/PassPage';
import NewsList from './pages/NewsList';
import { SafeAreaView } from 'react-navigation';
import {Toast,feach_request} from "./pages/tools/public";
import AsyncStorage from '@react-native-community/async-storage';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const tabData = [
    {icon:require('./images/msg_on.png'),selectedIcon:require('./images/msg_select.png'),tabPage:'MsgList',tabName:'消息',component:MsgList},
    {icon:require('./images/bugle_on.png'),selectedIcon:require('./images/bugle_select.png'),tabPage:'NewsList',tabName:'公告',component:NewsList},
    {icon:require('./images/pass_on.png'),selectedIcon:require('./images/pass_select.png'),tabPage:'PassPage',tabName:'通行',component:PassPage},
    {icon:require('./images/oa_on.png'),selectedIcon:require('./images/oa_select.png'),tabPage:'ModuleCollect',tabName:'功能',component:ModuleCollect}
];
var navigation = null;
type Props = {};
export default class App extends Component<Props> {
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        navigation = this.props.navigation;
        this.state = {
            selectedTab:this.props.navigation.state.params.selectedTab
        }
    }
    componentDidMount() {
        feach_request('/user/info','GET')
            .then((data)=>{
                if(data.code==0){
                    AsyncStorage.setItem('userInfo',JSON.stringify(data.data));
                }
            })
            .catch((err)=>{
                Toast('网络错误～')
            })
        if(Platform.OS === "android"){
            BackHandler.addEventListener('hardwareBackPress',
                this.onBackButtonPressAndroid);
        }
    }

    componentWillUnmount() {
        if(Platform.OS === "android"){
            BackHandler.removeEventListener('hardwareBackPress',
                this.onBackButtonPressAndroid);
        }
    }
  render() {
      let tabViews = tabData.map((item,i) => {
          return (
              <TabNavigator.Item
                  title={item.tabName}
                  selected={this.state.selectedTab===item.tabPage}
                  titleStyle={{color:'#333333'}}
                  selectedTitleStyle={{color:'#1296db'}}
                  renderIcon={()=><Image style={styles.tabIcon} source={item.icon}/>}
                  renderSelectedIcon = {() => <Image style={styles.tabIcon} source={item.selectedIcon}/>}
                  tabStyle={{alignSelf:'center'}}
                  onPress = {() => {this.setState({selectedTab:item.tabPage})}}
                  key={i}
              >
                  <item.component  navigation={navigation}/>
              </TabNavigator.Item>
          );
      });
      return (
          <SafeAreaView style={styles.container}>
              <TabNavigator
                  hidesTabTouch={true}
              >
                  {tabViews}
              </TabNavigator>
          </SafeAreaView>
      );
  }

    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                this.props.navigation.goBack();
                return false;
            }
            this.lastBackPressed = Date.now();
            Toast('再按一次退出应用');
            return true;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8f8f8',
    },
    tabIcon:{
        width:23,
        height:23,
    }
});
