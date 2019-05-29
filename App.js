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
import Map from './pages/Map';
import MsgList from './pages/MsgList';
import OaList from './pages/OaList';
import PassPage from './pages/PassPage';
import NewsList from './pages/NewsList';
import { SafeAreaView } from 'react-navigation';
import {Toast} from "./pages/tools/public";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const dataSource = [
    {icon:require('./images/msg_on.png'),selectedIcon:require('./images/msg_select.png'),tabPage:'MsgList',tabName:'消息',component:MsgList},
    {icon:require('./images/bugle_on.png'),selectedIcon:require('./images/bugle_select.png'),tabPage:'NewsList',tabName:'公告',component:NewsList},
    {icon:require('./images/pass_on.png'),selectedIcon:require('./images/pass_select.png'),tabPage:'PassPage',tabName:'通行',component:PassPage},
    {icon:require('./images/oa_on.png'),selectedIcon:require('./images/oa_select.png'),tabPage:'OaList',tabName:'事务',component:OaList}
];
const newDataSource = [
    {icon:require('./images/msg_on.png'),selectedIcon:require('./images/msg_select.png'),tabPage:'MsgList',tabName:'消息',component:MsgList},
    {icon:require('./images/bugle_on.png'),selectedIcon:require('./images/bugle_select.png'),tabPage:'NewsList',tabName:'公告',component:NewsList},
    {icon:require('./images/pass_on.png'),selectedIcon:require('./images/pass_select.png'),tabPage:'PassPage',tabName:'通行',component:PassPage},
    {icon:require('./images/oa_on.png'),selectedIcon:require('./images/oa_select.png'),tabPage:'OaList',tabName:'事务',component:OaList},
    {icon:require('./images/home_on.png'),selectedIcon:require('./images/home_select.png'),tabPage:'Map',tabName:'物业',component:Map}
]
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
            selectedTab:'MsgList',
            isVisitor:false
        }
    }
  render() {
        var tabData = this.state.isVisitor? dataSource:newDataSource;
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
    componentDidMount() {
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
