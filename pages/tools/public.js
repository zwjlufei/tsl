//公共方法
import React, { Component } from 'react';
import {Platform,ToastAndroid, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// const URL = 'https://192.168.11.88/api/';
const URL = 'http://192.168.11.44:5050/api/';
//数据请求
export function feach_request(api,method,data){
    if (method === 'GET'){
        return new Promise((resolve,reject)=>{
            fetch(URL+api,{
                method : method,
                credentials: 'include',
                mode: 'cors'
            }).then(response=> response.json())
                .then(responseData=>{
                    resolve(responseData)
                })
                .catch(error=>{
                    reject(error)
                })
        })
    }else{
        return new Promise((resolve,reject)=>{
            fetch(URL+api,{
                method : method,
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body:data
            }).then(response=> response.json())
                .then(responseData=>{
                    resolve(responseData)
                })
                .catch(error=>{
                    reject(error)
                })
            setTimeout(()=>{
                reject('network error')
            },10000)
        })
    }
}
//弹框
export function Toast(message) {
    if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    } else if (Platform.OS === "ios") {
        Alert.alert(message);
    }
}
//获取storage
export function getStorage(type){
    return new Promise((resolve,reject)=>{
        AsyncStorage.getItem(type,(error,result)=>{
            if (result != null){
                var user_info = JSON.parse(result)
                resolve(user_info)
            }else{
                reject(error)
            }
        })
    })
}
//数据上传格式转换
export function dataReset(data){
    var param = '';
    for(const i in data){
        param = param+`${i}=${data[i]}&`
    }
    param = param.substring(0,param.length-1)
    return param;
}
//获取一个月有几天
export function getDays(year,month){
    var d = new Date(year, month, 0);
    return d.getDate();
}
//截取最后一个字符
export function deleteLast(str){
    return str = str.substring(0,str.length-1)
}
//时间比较
export function compareTime(time1,time2) {
    let regEx = new RegExp("\\-","gi");
    let Time1=time1.replace(regEx,"/");
    let Time2=time2.replace(regEx,"/");
    if(Date.parse(Time1)>Date.parse(Time2)||Date.parse(Time1)==Date.parse(Time2)){
        return true;
    }else {
        return false;
    }
}
//时间转换
export function changeTime(time) {
    let regEx = new RegExp("\\-","gi");
    let Time=time.replace(regEx,"/");
    return Date.parse(Time);
}