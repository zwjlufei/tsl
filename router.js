import React from 'react';
import { createStackNavigator,
    createAppContainer} from 'react-navigation';
import AuthLoading from './pages/AuthLoading';
import Login from './pages/Login';
import Map from './pages/Map';
import PassPage from './pages/PassPage';
import App from './App';
import MsgList from './pages/MsgList';
import OaList from './pages/OaList';
import MsgDetail from './pages/msg/MsgDetail';
import OaDetail from './pages/oa/OaDetail';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/news/NewsDetail';
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
        OaDetail: {
            screen: OaDetail
        },
        PassPage: {
            screen: PassPage
        },
        NewsDetail: {
            screen: NewsDetail
        },
    },
    {
        initialRouteName: 'AuthLoading'
    });
const myApp = createAppContainer(Router);
export default myApp;