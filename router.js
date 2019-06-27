import React from 'react';
import { createStackNavigator,
    createAppContainer} from 'react-navigation';
import AuthLoading from './pages/AuthLoading';
import Login from './pages/Login';
import Map from './pages/Map';
import PassPage from './pages/PassPage';
import App from './App';
import MsgList from './pages/MsgList';
import OaList from './pages/oa/OaList';
import MsgDetail from './pages/msg/MsgDetail';
import EventProcess from './pages/oa/EventProcess';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/news/NewsDetail';
import LiveVideo from './pages/device/LiveVideo';
import ModuleCollect from './pages/ModuleCollect';
import PeopleSearch from './pages/personnel/PeopleSearch';
import PrivatAttendance from './pages/attendance/PrivatAttendance';
import PersonDetail from './pages/personnel/PersonDetail';
import DeviceList from './pages/device/DeviceList';
import VodVideo from './pages/device/VodVideo';
import EventList from './pages/event/EventList';
import CallNum from './pages/property/CallNum';
import SettingPage from './pages/setting/SettingPage';
import StrangerList from './pages/stranger/StrangerList';
import StatisticsSimple from './pages/statistics/StatisticsSimple';
import TenementApply from './pages/tenement/TenementApply';
import SmartHouse from './pages/tenement/SmartHouse';
import InfoSubmit from './pages/tenement/InfoSubmit';
const Router = createStackNavigator({
        AuthLoading: {
            screen: AuthLoading
        },
        Login: {
            screen: Login
        },
        App: {
            screen: App
        },
        Map: {
            screen: Map
        },
        MsgList: {
            screen: MsgList
        },
        OaList: {
            screen: OaList
        },
        NewsList: {
            screen: NewsList
        },
        MsgDetail: {
            screen: MsgDetail
        },
        EventProcess: {
            screen: EventProcess
        },
        PassPage: {
            screen: PassPage
        },
        NewsDetail: {
            screen: NewsDetail
        },
        LiveVideo: {
            screen: LiveVideo
        },
        ModuleCollect: {
            screen: ModuleCollect
        },
        PeopleSearch: {
            screen: PeopleSearch
        },
        PrivatAttendance: {
            screen: PrivatAttendance
        },
        PersonDetail: {
            screen: PersonDetail
        },
        DeviceList: {
            screen: DeviceList
        },
        VodVideo: {
            screen: VodVideo
        },
        EventList: {
            screen: EventList
        },
        CallNum: {
            screen: CallNum
        },
        SettingPage: {
            screen: SettingPage
        },
        StrangerList: {
            screen: StrangerList
        },
        StatisticsSimple:{
            screen: StatisticsSimple
        },
        TenementApply:{
            screen: TenementApply
        },
        SmartHouse:{
            screen: SmartHouse
        },
        InfoSubmit:{
            screen: InfoSubmit
        }
    },
    {
        initialRouteName: 'AuthLoading'
    });
const myApp = createAppContainer(Router);
export default myApp;