import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Dimensions,
    Animated,
    InteractionManager,
    Easing,
    Alert,
    Image,
    ImageBackground
} from 'react-native';
import Header from "../CommonModules/Header";
import {RNCamera} from 'react-native-camera';
let {width, height} = Dimensions.get('window');
import { NavigationActions,StackActions } from 'react-navigation'
export default class TenementApply extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            show: true,
            // animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
            animate: new Animated.Value((width - 200) / 2,(height - 340) / 2),
        }
    }
    componentDidMount(){
        console.log(NavigationActions)
        InteractionManager.runAfterInteractions(() => {
            this.startAnimation()
        })
    }
    // 动画开始
    startAnimation(){
        if(this.state.show){
            this.state.animate.setValue(0);
            Animated.timing(this.state.animate,{
                toValue: 1,   // 运动终止位置，比值
                duration: 2500,  // 动画时长
                easing: Easing.linear,  // 线性的渐变函数
                delay: 0.5,// 在一段时间之后开始动画（单位是毫秒），默认为0
            }).start(() => this.startAnimation())
        }
    }
    componentWillUnmount(){
        this.state.show = false;
    }
    barcodeReceived(e){
        // console.log(e);
        if(this.state.show){
            console.log(e);
            this.state.show = false;
            // this.props.navigation.dispatch('SmartHouse',{msg:e});
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'SmartHouse',params:{msg:e} })
                ],
            }))
        }
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'自主申报'} navigate={this.props.navigation}/>
                <View style={styles.container}>
                    <RNCamera
                        onBarCodeRead={this.barcodeReceived.bind(this)}
                        onCameraReady={() => {
                            console.log('ready')
                        }}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        style={styles.camera}
                    >
                        <View style={styles.box}>
                            <View style={styles.kuang}>
                                <Animated.View style={{
                                    alignItems: 'center',
                                    transform: [{
                                        translateY: this.state.animate.interpolate({
                                            inputRange: [0,1],
                                            outputRange: [0,200]
                                        })
                                    }]
                                }}>
                                    <Text style={{width:250,height:1,backgroundColor:'#00ff00'}}></Text>
                                </Animated.View>
                            </View>
                        </View>
                    </RNCamera>
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
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    kuang: {
        width: 260,
        height: 260,
        borderWidth: 1,
        borderColor: 'skyblue',
        backgroundColor: '#rgba(255,255,255,0.1)'
    }
});