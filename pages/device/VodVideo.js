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
import {Toast,feach_request,getDays,deleteLast,compareTime,changeTime} from '../tools/public';
import px2dp from "../tools/px2dp";
import Picker from "react-native-picker";
import constant from "../tools/constant";
var selectData = [];
let date = new Date();
function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
        if(i > 60){
            h = parseInt(i / 60);
            i = parseInt(i % 60);
        }

    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
}
export default class VodVideo extends Component {

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
            duration: 2000,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
            videoShow:false,
            startTime:'0000-00-00 00:00:00',
            endTime:'0000-00-00 00:00:00',
            dev:{},
            vod:'',
            videoLength:0,
            selectYear:date.getFullYear(),
            selectMonth: date.getMonth() + 1
        };
    }
    componentDidMount() {
        let dev = this.props.navigation.state.params.device;
        this.setState({
            dev:dev
        });
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
        this.timerInit && clearTimeout(this.timerInit);
        this.time && clearTimeout(this.time);
        Picker.hide();
        Orientation.lockToPortrait();
    }
    _createDateData() {
        let years = [],
            months = [],
            days = [],
            hours = [],
            minutes = [],
            seconds = [];
        for(let i=1;i<51;i++){
            years.push(i+1980+'年');
        }
        for(let i=1;i<13;i++){
            months.push(i+'月');
        }
        for(let i=1;i<32;i++){
            days.push(i+'日');
        }
        for(let i=1;i<25;i++){
            hours.push(i+'时');
        }
        for(let i=0;i<61;i++){
            minutes.push(i+'分');
        }
        for(let i=0;i<61;i++){
            seconds.push(i+'秒');
        }
        let pickerData = [years, months, days , hours, minutes,seconds];

        let date = new Date();
        selectData = [
            date.getFullYear()+'年',
            date.getMonth()+1+'月',
            date.getDate()+'日',
            date.getHours()+'时',
            date.getMinutes()+'分',
            date.getSeconds()+'秒'
        ];
        return pickerData;
    }
    //显示日期插件
    _showDatePicker(state) {
        console.log('000')
        Picker.init({
            pickerData: this._createDateData(),
            selectedValue:selectData,
            pickerFontColor: [51, 51 ,51, 1],
            pickerTitleText:'时间选择',
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            wheelFlex: [2, 1, 1, 1, 1, 1],
            onPickerConfirm: (pickedValue) => {
                let year = deleteLast(pickedValue[0]);
                let month = deleteLast(pickedValue[1])<10?'0'+deleteLast(pickedValue[1]):deleteLast(pickedValue[1]);
                let day = deleteLast(pickedValue[2])<10?'0'+deleteLast(pickedValue[2]):deleteLast(pickedValue[2]);
                let hour = deleteLast(pickedValue[3])<10?'0'+deleteLast(pickedValue[3]):deleteLast(pickedValue[3]);
                let minute = deleteLast(pickedValue[4])<10?'0'+deleteLast(pickedValue[4]):deleteLast(pickedValue[4]);
                let second = deleteLast(pickedValue[5])<10?'0'+deleteLast(pickedValue[5]):deleteLast(pickedValue[5]);
                let monthDays = getDays(year,month);
                if( deleteLast(pickedValue[2])>monthDays){
                    Toast('所选日期无效，请确保日期的正确性～')
                }else {
                    if(state=='start'){
                        this.setState({
                            startTime:year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
                        })
                    }else {
                        this.setState({
                            endTime:year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
                        })
                    }
                }
            },
            onPickerCancel: (pickedValue) => {
                console.log('date', pickedValue);
            },
            onPickerSelect: (pickedValue) => {
                console.log('date', pickedValue);
            }
        });
        Picker.show();
    }
    //请求vod
    requestVod(){
        if(this.state.vod){
            feach_request(`/vod?dev=${this.state.dev.container}&vod=${this.state.vod}`,'GET')
                .then((data)=>{
                    console.log('data2',data);
                    if(data.code==0){
                        this.timer = setTimeout(() => {
                            this.requestVod();
                        }, 8000);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    Toast('网络异常～');
                })
        }
    }
    //playVod
    playVod(){
        let  result= compareTime(this.state.endTime,this.state.startTime);
        let start = changeTime(this.state.startTime)/1000;
        let end = changeTime(this.state.endTime)/1000;
        console.log(start,end)
        if(result){
            feach_request(`/vod?dev=${this.state.dev.container}&channel=${this.state.dev.anchor}&begin_time=${start}&end_time=${end}`,'GET')
                .then((data)=>{
                    console.log(data)
                    if(data.code==0){
                        this.timerInit = setTimeout(() => {
                            this.requestVod();
                        }, 8000);
                        this.setState({
                            videoLength:end-start,
                            vod:data.stream,
                            videoShow:true,
                            videoUrl:(Platform.OS === "ios"?`${constant.url}/av/${data.stream}.m3u8`:`${constant.url}/av/${data.stream}.flv`)
                        })
                    }else {
                        Toast('点播失败～');
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    Toast('网络异常～');
                })
        }else {
            Toast('结束时间不能小于开始时间～');
        }
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
                    this.state.videoShow?(
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
                                            value={this.state.currentTime}
                                            minimumValue={0}
                                            thumbTintColor={'#e0e0e0'}
                                            maximumValue={this.state.videoLength}
                                            onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                                        />
                                        <Text style={styles.time}>{formatTime(this.state.videoLength)}</Text>
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
                    ):(<View>
                        <View style={styles.plr_15}>
                            <Text style={styles.title}>选择点播时间</Text>
                            <TouchableWithoutFeedback onPress={()=>{this._showDatePicker('start')}}>
                                <View style={styles.flex_row_center}>
                                    <Text>开始时间</Text>
                                    <View style={styles.time_wrap}>
                                        <Text>{this.state.startTime}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{this._showDatePicker('end')}}>
                                <View style={styles.flex_row_center}>
                                    <Text>结束时间</Text>
                                    <View style={styles.time_wrap}>
                                        <Text>{this.state.endTime}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>{this.playVod()}}>
                            <View style={styles.play_btn}>
                                <Text style={styles.play_btn_font}>播放</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>)
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
        console.log(currentTime)
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
        if(this.state.videoShow){
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
        }
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
    },
    title:{
        fontSize: px2dp(16),
        marginTop:px2dp(15),
        marginBottom: px2dp(20)
    },
    time_wrap:{
        width:px2dp(200),
        height:px2dp(40),
        borderRadius:px2dp(5),
        backgroundColor:'#e0e0e0',
        justifyContent:'center',
        paddingLeft:px2dp(15),
        marginLeft:px2dp(15)
    },
    flex_row_center:{
        flexDirection: 'row',
        alignItems:'center',
        marginBottom:px2dp(20)
    },
    plr_15:{
        paddingHorizontal: px2dp(15)
    },
    play_btn:{
        width:px2dp(100),
        height:px2dp(40),
        borderRadius: px2dp(5),
        backgroundColor:'#66b3ff',
        marginLeft:px2dp(120)
    },
    play_btn_font:{
        fontSize: px2dp(15),
        color: '#fff',
        textAlign: 'center',
        lineHeight:px2dp(40),
        letterSpacing:px2dp(2)
    }
});
