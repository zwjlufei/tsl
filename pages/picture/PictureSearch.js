import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Picker,
    Dimensions,
    FlatList, ActivityIndicator
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import {feach_request, Toast} from "../tools/public";
var {width,height} = Dimensions.get('window');
import constant from '../tools/constant';
import ImagePicker from 'react-native-image-crop-picker';
export default class PictureSearch extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
            listData:[],
            img:'',
            loading:false,
            bigImg:'',
            hint:'暂时还没有数据哦～'
        }
    }
    //图片上传
    uploadPic(image){
        let formData = new FormData();
        var path = image.path;
        var name = image.mime;
        let file = {uri: path, type: 'application/octet-stream', name: name};
        formData.append("file",file);
        fetch(`${constant.url}/api/avatar/search`,{
            method:"POST",
            credentials: 'include',
            headers: {
                'Content-Type':'multipart/form-data;charset=utf-8'
            },
            body:formData
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response)
                if(response.code==0){
                    if(response.data.length>0){
                        Toast('上传成功')
                    }else {
                        Toast('暂未查到相关内容')
                        this.setState({
                            hint:'暂未查到相关内容'
                        })
                    }

                    this.setState({
                        img:path,
                        loading:false,
                        listData:response.data
                    })
                }
            })
            .catch((error)=>{
                Toast('网络错误')
            })
    }
    //调用相机
    getCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
            compressImageQuality:0.3
        }).then(image => {
            console.log(image);
            this.setState({
                modalVisible: false,
                loading:true
            })
            this.uploadPic(image);

        }).catch(e => console.log(e));
    }
    //调用相册
    photoAlbum(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            compressImageQuality:0.3
        }).then(image => {
            console.log(image);
            this.setState({
                modalVisible: false,
                loading:true
            })
            this.uploadPic(image);

        }).catch(e => console.log(e));
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'人员搜索'} navigate={this.props.navigation}/>
                {
                    this.state.loading?(
                        <View style={{position: 'absolute',left: 0,width:width,height:px2dp(200),paddingTop:px2dp(150),elevation:5}}>
                            <ActivityIndicator
                                animating={this.state.loading}
                                size='large'
                                style={{backgroundColor:'transparent'}}
                                color="#d9d9d9"
                            />
                        </View>
                    ):(null)
                }
                <ScrollView style={{backgroundColor:'#fff',flex:1}}>
                    <View style={styles.flex_center}>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.setState({
                                modalVisible: true,
                                bigImg:false
                            })
                        }}>
                            <View style={styles.upload_btn}>
                                <Text style={styles.upload_btn_font}>上传要搜索的图片</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*{*/}
                            {/*this.state.img?(*/}
                                {/*<View style={styles.info_files_wrap}>*/}
                                    {/*<Image*/}
                                        {/*style={{width: 150,height:200}}*/}
                                        {/*source={{uri: this.state.img}}*/}
                                    {/*/>*/}
                                {/*</View>*/}
                            {/*):(null)*/}
                        {/*}*/}
                    </View>
                    {
                        this.state.listData.length>0?(
                            this.state.listData.map((item,index)=>{
                                return(
                                    <View style={[styles.flex_space_between,styles.info_item]}>
                                        <TouchableWithoutFeedback onPress={()=>{
                                            if(item.bigpic){
                                                this.setState({
                                                    modalVisible: true,
                                                    bigImg:true,
                                                    imgSource:`${constant.url}${item.avatar}`
                                                })
                                            }
                                        }}>
                                            <Image
                                                style={{width: 120,height:120,backgroundColor:'#e0e0e0',marginRight:px2dp(15)}}
                                                source={{uri: `${constant.url}${item.bigpic}`}}
                                            />
                                        </TouchableWithoutFeedback>

                                        <View style={[styles.flex,styles.msg_wrap]}>
                                            <Text>姓名：{item.name?item.name:'无'}</Text>
                                            <Text>别名：{item.alias?item.alias:'无'}</Text>
                                            <Text>身份证号：{item.SID?item.SID:'无'}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        ):(
                            <View style={{flex:1,alignItems:'center',backgroundColor:'#fff'}}>
                                {/*<Text style={{fontSize:px2dp(22),textAlign: 'center',marginTop:px2dp(100)}}>暂无数据</Text>*/}
                                <Image
                                    style={{width: 300,height:200,marginTop:px2dp(100)}}
                                    source={require('./../../images/empty_list.png')}
                                />
                                <Text style={styles.warn_font}>{this.state.hint}</Text>
                            </View>
                        )
                    }

                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}>
                    <View style={styles.modal_mask}>
                        <View style={styles.info_wrap}>
                            {
                                this.state.bigImg?(
                                    <TouchableWithoutFeedback onPress={()=>{
                                        this.setState({
                                            modalVisible: false
                                        })
                                    }}>
                                        <View style={styles.modal_mask}>
                                            <Image
                                                style={{width: width,height:height}}
                                                source={{uri: this.state.imgSource}}
                                                resizeMode={'contain'}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                ):(
                                    <View>
                                        <TouchableWithoutFeedback onPress={()=>{this.getCamera()}}>
                                            <View>
                                                <View style={[styles.module_title_wrap,styles.flex_center]}>
                                                    <Text style={styles.modal_item_font}>相机</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={()=>this.photoAlbum()}>
                                            <View>
                                                <View style={[styles.module_title_wrap,styles.flex_center]}>
                                                    <Text style={styles.modal_item_font}>手机相册</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={()=>{
                                            this.setState({
                                                modalVisible: false
                                            })
                                        }}>
                                            <View>
                                                <View style={[styles.module_title_wrap,styles.flex_center]}>
                                                    <Text style={styles.modal_item_font}>取消</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </Modal>
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
    p_15:{
        padding:px2dp(15)
    },
    module_title_wrap:{
        height:px2dp(45),
        borderBottomWidth:px2dp(1),
        borderBottomColor:'#e0e0e0',
        paddingHorizontal:px2dp(15)
    },
    modal_mask:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    info_wrap:{
        width:width,
        backgroundColor:'#ffffff',
        position:'absolute',
        bottom:0,
        left:0,
        paddingVertical:px2dp(15)
    },
    flex_center:{
        justifyContent:'center',
        alignItems:'center'
    },
    modal_item_font:{
        color:'#32bbff',
        fontSize: px2dp(16),
        letterSpacing: px2dp(1)
    },
    upload_btn:{
        width:px2dp(280),
        height:px2dp(45),
        borderRadius:px2dp(5),
        backgroundColor:'#32bbff',
        marginTop:px2dp(20)
    },
    upload_btn_font:{
        color: '#fff',
        fontSize: px2dp(16),
        textAlign: 'center',
        lineHeight:px2dp(45)
    },
    info_files_wrap :{
        borderStyle:'dashed',
        borderWidth:px2dp(1),
        borderColor:'#e0e0e0',
        height:px2dp(200),
        width:px2dp(150),
        borderRadius:px2dp(5),
        marginTop:px2dp(15),
        justifyContent: 'center',
        alignItems:'center',
        overflow: 'hidden'
    },
    info_item:{
        padding: px2dp(15),
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: px2dp(1)
    },
    msg_wrap:{
        justifyContent:'space-around',
        height:px2dp(120)
    },
    warn_font:{
        fontSize:px2dp(13),
        marginTop: px2dp(10)
    }
});