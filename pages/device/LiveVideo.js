import React, {Component} from 'react';
import {
    View,
    Platform,
    Dimensions,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Button,
    StyleSheet,
    StatusBar, Modal
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Icon from "react-native-vector-icons/AntDesign";
import Slider from 'react-native-slider';
import Header from "../CommonModules/Header";
const screenWidth = Dimensions.get('window').width;
import {Toast,feach_request} from '../tools/public';
import px2dp from "../tools/px2dp";
import constant from "../tools/constant";
function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
}
var url = '';
export default class LiveVideo extends Component {

    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: "",
            videoWidth: screenWidth,
            videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0.2,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
            videoShow:false
        };
    }
    componentDidMount() {
        // let url = ;
        // let url = `http://192.168.11.88:8080/av/${设备}.flv`;
        this.requestLive();
    }
    componentWillUnmount(){
        url = '';
        this.timer && clearTimeout(this.timer);
        this.time && clearTimeout(this.time);
        Orientation.lockToPortrait();
    }
    //请求live
    requestLive(){
        let dev = this.props.navigation.state.params.device;
        feach_request(`/live?dev=${dev.container}&channel=${dev.anchor}&substream=0`,'GET')
            .then((data)=>{
                if(data.code==0){
                    this.timer = setTimeout(() => {
                        this.requestLive();
                    }, 8000);
                    url = data.stream;
                    this.setState({
                        videoUrl:(Platform.OS === "ios"?`${constant.url}/av/${data.stream}.m3u8`:`${constant.url}/av/${data.stream}.flv`)
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
                Toast('网络异常～');
            })
    }

    render() {
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <StatusBar hidden={this.state.isFullScreen} />
                {
                    this.state.isFullScreen?(null):(
                        <Header title={'视频详情'} navigate={this.props.navigation}/>
                    )
                }
                {
                    url?(
                        <View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor:'#000000' }}>
                            <Video
                                ref={(ref) => this.videoPlayer = ref}
                                source={{uri: this.state.videoUrl}}
                                rate={1.0}
                                volume={1.0}
                                muted={false}
                                paused={!this.state.isPlaying}
                                resizeMode={'contain'}
                                playWhenInactive={false}
                                playInBackground={false}
                                ignoreSilentSwitch={'ignore'}
                                progressUpdateInterval={250.0}
                                onLoadStart={this._onLoadStart}
                                onLoad={this._onLoaded}
                                onProgress={this._onProgressChanged}
                                onEnd={this._onPlayEnd}
                                onError={this._onPlayError}
                                onBuffer={this._onBuffering}
                                style={{width: this.state.videoWidth, height: this.state.videoHeight}}
                            />
                            <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: this.state.videoWidth,
                                        height: this.state.videoHeight,
                                        backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}>
                                    {
                                        this.state.isPlaying ? null :
                                            <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                                                <Icon name="playcircleo" size={50} color="#ffffff" />
                                            </TouchableWithoutFeedback>
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                            {
                                this.state.showVideoControl ? (
                                    <View>
                                        <Icon name="shrink" size={20} color="#ffffff" />
                                    </View>
                                ):(null)
                            }
                            {
                                this.state.showVideoControl ?
                                    <View style={[styles.control, {width: this.state.videoWidth}]}>
                                        <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                                            {this.state.isPlaying?(
                                                <Icon name="pause" size={22} color="#ffffff" />
                                            ):(
                                                <Icon name="caretright" size={20} color="#ffffff" />
                                            )}

                                        </TouchableOpacity>
                                        <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                                        <Slider
                                            style={styles.slider_style}
                                            maximumTrackTintColor={'#999999'}
                                            minimumTrackTintColor={'#32bbff'}
                                            value={10}
                                            minimumValue={0}
                                            thumbTintColor={'#e0e0e0'}
                                            maximumValue={20}
                                            onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                                        />
                                        <Text style={styles.time}>{formatTime(20)}</Text>
                                        <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                                            {
                                                this.state.isFullScreen?(
                                                    <Icon name="shrink" size={20} color="#ffffff" />
                                                ):(
                                                    <Icon name="arrowsalt" size={20} color="#ffffff" />
                                                )
                                            }
                                        </TouchableOpacity>
                                    </View> : null
                            }
                        </View>
                    ):(null)
                }

            </View>
        )
    }

    /// -------Video组件回调事件-------

    _onLoadStart = () => {
        console.log('视频开始加载');
    };

    _onBuffering = () => {
        console.log('视频缓冲中...')
    };

    _onLoaded = (data) => {
        this.setState({
            duration: data.duration,
        });
    };
    _onProgressChanged = (data) => {
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };

    _onPlayEnd = () => {
        console.log('视频播放结束');
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true
        });
    };

    _onPlayError = () => {
        console.log('视频播放失败');
    };

    ///-------控件点击事件-------

    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
        console.log('控制播放器工具栏',this.state.showVideoControl)
        if (this.state.showVideoControl) {
            this.setState({
                showVideoControl: false,
            })
        } else {
            this.setState(
                {
                    showVideoControl: true,
                },
                // 5秒后自动隐藏工具栏
                () => {
                    this.timer = setTimeout(
                        () => {
                            this.setState({
                                showVideoControl: false
                            })
                        }, 5000
                    )
                }
            )
        }
    }

    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
        let isPlay = !this.state.isPlaying;
        this.setState({
            isPlaying: isPlay
        });
        if (this.state.playFromBeginning) {
            this.videoPlayer.seek(0);
            this.setState({
                playFromBeginning: false,
            })
        }
    }

    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
        this.onPressPlayButton();
    }

    /// 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    }

    /// 进度条值改变
    onSliderValueChanged(currentTime) {
        this.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({
                currentTime: currentTime
            })
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true
            })
        }
    }

    /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
    _onLayout = (event) => {
        //获取根View的宽高
        let {width, height} = event.nativeEvent.layout;
        console.log('通过onLayout得到的宽度：' + width);
        console.log('通过onLayout得到的高度：' + height);

        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape){
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 9/16,
                isFullScreen: false,
            })
        }
        Orientation.unlockAllOrientations();
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    control: {
        flexDirection: 'row',
        height: 44,
        alignItems:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingHorizontal:30
    },
    slider_style: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    }
});
