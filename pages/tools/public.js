//公共方法
import React, { Component } from 'react';
import {Platform,ToastAndroid, AlertIOS} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const URL = 'http://192.168.11.88:8090/api/';
//数据请求
export function feach_request(api,method,data){
    if (method === 'GET'){
        return new Promise((resolve,reject)=>{
            fetch(URL+api,{
                method : method,
                credentials: 'include'
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
        AlertIOS.alert(message);
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

