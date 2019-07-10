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
    Dimensions, TextInput, BackHandler
} from 'react-native';
import Header from "../CommonModules/Header";
import px2dp from "../tools/px2dp";
import {feach_request, Toast} from "../tools/public";
import Icon from "react-native-vector-icons/Entypo";
var {width,height} = Dimensions.get('window');
import ImagePicker from 'react-native-image-crop-picker';
export default class InfoSubmit extends Component{
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
            modalShow:'',
            sex:'',
            cardType:'',
            name:'',
            phone:'',
            cardNum: '',
            frontCard:'',
            reverseCard:'',
            photoType:'',
            facePhoto:''
        }
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack(); // works best when the goBack is async
            return true;
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    //调用相机
    getCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            console.log(image);
            if(this.state.photoType=='frontCard'){
                this.setState({
                    frontCard:image.path,
                    modalVisible: false
                })
            }else if(this.state.photoType=='reverseCard'){
                this.setState({
                    reverseCard:image.path,
                    modalVisible: false
                })
            }else if(this.state.photoType=='facePhoto'){
                this.setState({
                    facePhoto:image.path,
                    modalVisible: false
                })
            }
        }).catch(e => console.log(e));
    }
    //调用相册
    photoAlbum(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            console.log(image);
            if(this.state.photoType=='frontCard'){
                this.setState({
                    frontCard:image.path,
                    modalVisible: false
                })
            }else if(this.state.photoType=='reverseCard'){
                this.setState({
                    reverseCard:image.path,
                    modalVisible: false
                })
            }else if(this.state.photoType=='facePhoto'){
                this.setState({
                    facePhoto:image.path,
                    modalVisible: false
                })
            }
        }).catch(e => console.log(e));
    }
    //提交按钮
    submitInfo(){
        Toast('提交成功～');
        this.props.navigation.goBack();
    }
    //底部弹框
    modalRender(){
        if(this.state.modalShow=='camera'){
            return(
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
                </View>
            )
        }else if(this.state.modalShow=='sex'){
            return(
                <View>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.setState({
                            sex:'男',
                            modalVisible: false
                        })
                    }}>
                        <View>
                            <View style={[styles.module_title_wrap,styles.flex_center]}>
                                <Text style={styles.modal_item_font}>男</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.setState({
                            sex:'女',
                            modalVisible: false
                        })
                    }}>
                        <View>
                            <View style={[styles.module_title_wrap,styles.flex_center]}>
                                <Text style={styles.modal_item_font}>女</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }else if(this.state.modalShow=='card'){
            return(
                <View>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.setState({
                            cardType:'身份证',
                            modalVisible: false
                        })
                    }}>
                        <View>
                            <View style={[styles.module_title_wrap,styles.flex_center]}>
                                <Text style={styles.modal_item_font}>身份证</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.setState({
                            cardType:'居民证',
                            modalVisible: false
                        })
                    }}>
                        <View>
                            <View style={[styles.module_title_wrap,styles.flex_center]}>
                                <Text style={styles.modal_item_font}>居民证</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={{flex:1,backgroundColor: '#fcfcfc'}}>
                <Header title={'租户资料提交'} navigate={this.props.navigation}/>
                <ScrollView style={styles.flex}>
                    <View style={styles.p_15}>
                        <View style={styles.module_wrap}>
                            <View style={[styles.module_title_wrap,styles.blue_bg]}>
                                <Text style={styles.white_font}>房屋信息</Text>
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>所在小区</Text>
                                <Text style={styles.item_content}>东三旗村</Text>
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>楼栋</Text>
                                <Text style={styles.item_content}>东三旗133号</Text>
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>楼层</Text>
                                <Text style={styles.item_content}>1楼</Text>
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>门牌号</Text>
                                <Text style={styles.item_content}>103室</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.p_15]}>
                        <View style={styles.module_wrap}>
                            <View style={[styles.module_title_wrap,styles.blue_bg]}>
                                <Text style={styles.white_font}>租户信息填写</Text>
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>租户名称</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({name:text})}
                                    placeholder={'请输入租户名称'}
                                    style={{textAlign: 'right',color:'#666'}}
                                />
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>性别</Text>
                                <TouchableWithoutFeedback onPress={()=>{
                                    this.setState({
                                        modalVisible: true,
                                        modalShow:'sex'
                                    })
                                }}>
                                    <View style={styles.select_item}>
                                        <Text>{this.state.sex?this.state.sex:'请选择'}</Text>
                                        <Icon name="chevron-thin-right" size={16} color="#666"/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>手机号码</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({phone:text})}
                                    placeholder={'请输入手机号'}
                                    style={{textAlign: 'right',color:'#666'}}
                                    maxLength={11}
                                />
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>证件类型</Text>
                                <TouchableWithoutFeedback onPress={()=>{
                                    this.setState({
                                        modalVisible: true,
                                        modalShow:'card'
                                    })
                                }}>
                                    <View style={styles.select_item}>
                                        <Text>{this.state.cardType?this.state.cardType:'请选择'}</Text>
                                        <Icon name="chevron-thin-right" size={16} color="#666"/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.module_title_wrap,styles.flex_space_between]}>
                                <Text style={styles.item_title}>证件号码</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({cardNum:text})}
                                    placeholder={'请输入证件号'}
                                    style={{textAlign: 'right',color:'#666'}}
                                    maxLength={18}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.p_15]}>
                        <View style={[styles.module_wrap,styles.p_15]}>
                            <Text style={styles.photo_title}>证件正反面照片</Text>
                            <View style={styles.info_files_wrap}>
                                {
                                    this.state.frontCard?(
                                        <Image
                                            style={{width: 320,height:200}}
                                            source={{uri: this.state.frontCard}}
                                        />
                                    ):(
                                        <TouchableWithoutFeedback onPress={()=>{
                                            this.setState({
                                                modalVisible: true,
                                                modalShow:'camera',
                                                photoType:'frontCard'
                                            })

                                        }}>
                                            <View style={{alignItems:'center'}}>
                                                <Icon name="plus" size={50} color="#666"/>
                                                <Text style={styles.hint_font}>请上传身份证人像面</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }
                            </View>
                            <View style={styles.info_files_wrap}>
                                {
                                    this.state.reverseCard?(
                                        <Image
                                            style={{width: 320,height:200}}
                                            source={{uri: this.state.reverseCard}}
                                        />
                                    ):(
                                        <TouchableWithoutFeedback onPress={()=>{
                                            this.setState({
                                                modalVisible: true,
                                                modalShow:'camera',
                                                photoType:'reverseCard'
                                            })

                                        }}>
                                            <View style={{alignItems:'center'}}>
                                                <Icon name="plus" size={50} color="#666"/>
                                                <Text style={styles.hint_font}>请上传身份证国徽面</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    <View style={[styles.p_15]}>
                        <View style={[styles.module_wrap,styles.p_15]}>
                            <Text style={styles.photo_title}>人脸照片</Text>
                            <View style={styles.flex_center}>
                                <View style={styles.face_files_wrap}>
                                    {
                                        this.state.facePhoto?(
                                            <Image
                                                style={{width: 248,height:298}}
                                                source={{uri: this.state.facePhoto}}
                                            />
                                        ):(
                                            <TouchableWithoutFeedback onPress={()=>{
                                                this.setState({
                                                    modalVisible: true,
                                                    modalShow:'camera',
                                                    photoType:'facePhoto'
                                                })

                                            }}>
                                                <View style={{alignItems:'center'}}>
                                                    <Icon name="user" size={40} color="#666"/>
                                                    <Text style={[styles.hint_font,styles.mt_10]}>请上传身份证人像面</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>this.submitInfo()}>
                        <View style={styles.login_btn}>
                            <Text style={styles.login_btn_font}>提交</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
                            {this.modalRender()}
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
    module_wrap:{
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor:'#333',
        shadowOffset:{h:5,w:0},
        shadowRadius:2,
        shadowOpacity:0.3,
        borderRadius:px2dp(5),
        overflow:'hidden'
    },
    blue_bg:{
        backgroundColor:'#32bbff',
        justifyContent: 'center'
    },
    white_font:{
        color:'#fff',
        fontSize:px2dp(17),
        letterSpacing:px2dp(2)
    },
    item_title:{
        color: '#333'
    },
    item_content:{
        color:'#b9bdbc'
    },
    info_files_wrap :{
        borderStyle:'dashed',
        borderWidth:px2dp(1),
        borderColor:'#e0e0e0',
        height:px2dp(200),
        borderRadius:px2dp(5),
        marginTop:px2dp(15),
        justifyContent: 'center',
        alignItems:'center',
        overflow: 'hidden'
    },
    face_files_wrap:{
        width:px2dp(250),
        borderStyle:'dashed',
        borderWidth:px2dp(1),
        borderColor:'#e0e0e0',
        height:px2dp(300),
        borderRadius:px2dp(5),
        marginTop:px2dp(15),
        justifyContent: 'center',
        alignItems:'center',
        overflow: 'hidden'
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
    select_item:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    mt_10:{
        marginTop:px2dp(10)
    },
    login_btn:{
        height: px2dp(45),
        backgroundColor:'#32bbff',
        margin:px2dp(15),
        borderRadius:px2dp(5)
    },
    login_btn_font:{
        color:'#fff',
        fontSize:px2dp(16),
        textAlign: 'center',
        lineHeight:px2dp(45),
        letterSpacing:px2dp(2)
    },
    photo_title:{
        fontSize:px2dp(17),
        color:'#333',
        letterSpacing:px2dp(1)
    }
});